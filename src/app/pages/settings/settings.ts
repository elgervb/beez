import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { BeeStore, DataSnapshot, ImportMode, ImportPreview, IntegrityReport } from '../../data/bee-store';
import { ConnectivityService } from '../../data/connectivity.service';
import { TranslationService } from '../../data/translation.service';
import { SupabaseStore } from '../../data/supabase-store';
import { AppShellComponent } from '../../ui/app-shell/app-shell';
import { TranslatePipe } from '../../ui/pipes/translate.pipe';

@Component({
  selector: 'bee-settings',
  imports: [AppShellComponent, DatePipe, TranslatePipe],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsPage implements OnDestroy, OnInit {
  private readonly store = inject(BeeStore);
  private readonly connectivity = inject(ConnectivityService);
  private readonly supabaseStore = inject(SupabaseStore);
  readonly i18n = inject(TranslationService);

  readonly data = computed(() => this.store.getData());
  readonly importMessage = signal<string>('');
  readonly pendingImport = signal<{ raw: unknown; preview: ImportPreview } | null>(null);
  readonly snapshots = signal<DataSnapshot[]>(this.store.listSnapshots());
  readonly reminderDays = signal<number>(this.loadReminderDays());
  readonly integrityReport = signal<IntegrityReport | null>(null);
  readonly pendingLocalChanges = signal(this.loadPendingLocalChanges());
  readonly lastSyncAt = signal(localStorage.getItem('beez-last-sync-at') ?? '');
  readonly authConfigured = signal(this.supabaseStore.isConfigured());
  readonly authSignedIn = signal(false);
  readonly authEmail = signal('');
  readonly authInputEmail = signal(localStorage.getItem('beez-auth-email') ?? '');
  readonly isOnline = this.connectivity.isOnline;

  readonly analytics = computed(() => {
    const data = this.data();
    const today = Date.now();
    const month = new Date().toISOString().slice(0, 7);
    const inspectionsThisMonth = data.inspections.filter((i) => i.date.startsWith(month)).length;
    const lowStoresRecent = data.inspections.filter((i) => i.storesLevel === 'low' && today - new Date(i.date).getTime() <= 14 * 86400000).length;
    const reminder = this.reminderDays();
    const overdue = data.hives.filter((h) => {
      const latest = data.inspections
        .filter((i) => i.hiveId === h.id)
        .sort((a, b) => b.date.localeCompare(a.date))[0];
      if (!latest) return true;
      const days = Math.floor((today - new Date(latest.date).getTime()) / 86400000);
      return days >= reminder;
    }).length;

    return {
      apiaries: data.apiaries.length,
      hives: data.hives.length,
      inspectionsThisMonth,
      overdue,
      lowStoresRecent
    };
  });

  private readonly backupInput = viewChild<ElementRef<HTMLInputElement>>('backupInput');

  private readonly onDataChanged = () => {
    this.pendingLocalChanges.set(this.loadPendingLocalChanges());
    this.lastSyncAt.set(localStorage.getItem('beez-last-sync-at') ?? '');
  };

  constructor() {
    globalThis.addEventListener('beez-data-changed', this.onDataChanged);
  }

  ngOnInit(): void {
    void this.refreshAuthStatus();
  }

  ngOnDestroy(): void {
    globalThis.removeEventListener('beez-data-changed', this.onDataChanged);
  }

  exportBackup(): void {
    const payload = this.store.exportData();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `beez-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    this.importMessage.set(this.i18n.t('settings.backupExported'));
  }

  openBackupPicker(): void {
    this.backupInput()?.nativeElement.click();
  }

  async onBackupFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw) as unknown;
      const preview = this.store.previewImport(parsed);
      if (!preview) {
        this.pendingImport.set(null);
        this.importMessage.set(this.i18n.t('settings.invalidBackupFile'));
        return;
      }
      this.pendingImport.set({ raw: parsed, preview });
      this.importMessage.set(this.i18n.t('settings.reviewImportPreview'));
    } catch {
      this.pendingImport.set(null);
      this.importMessage.set(this.i18n.t('settings.couldNotReadBackupFile'));
    } finally {
      input.value = '';
    }
  }

  applyImport(mode: ImportMode): void {
    const pending = this.pendingImport();
    if (!pending) return;
    const imported = this.store.importData(pending.raw, mode);
    this.importMessage.set(
      imported ? this.i18n.t('settings.backupModeCompleted', { mode }) : this.i18n.t('settings.importFailed')
    );
    if (imported) {
      this.pendingImport.set(null);
      this.snapshots.set(this.store.listSnapshots());
    }
  }

  cancelImportPreview(): void {
    this.pendingImport.set(null);
    this.importMessage.set(this.i18n.t('settings.importCanceled'));
  }

  restoreSnapshot(id: string): void {
    const snapshot = this.snapshots().find((s) => s.id === id);
    if (!snapshot) return;
    const confirmed = globalThis.confirm(this.i18n.t('settings.confirmRestoreSnapshot'));
    if (!confirmed) return;
    const restored = this.store.restoreSnapshot(id);
    this.importMessage.set(restored ? this.i18n.t('settings.snapshotRestored') : this.i18n.t('settings.snapshotRestoreFailed'));
  }

  runIntegrityCheck(): void {
    const report = this.store.getIntegrityReport();
    this.integrityReport.set(report);
    if (report.orphanHives === 0 && report.orphanInspections === 0) {
      this.importMessage.set(this.i18n.t('settings.integrityCheckPassed'));
    } else {
      this.importMessage.set(this.i18n.t('settings.integrityIssuesFound'));
    }
  }

  repairIntegrity(): void {
    const repaired = this.store.repairIntegrity();
    this.integrityReport.set(repaired.after);
    if (repaired.before.orphanHives === 0 && repaired.before.orphanInspections === 0) {
      this.importMessage.set(this.i18n.t('settings.noIntegrityIssuesToRepair'));
    } else {
      this.importMessage.set(
        this.i18n.t('settings.integrityRepairSummary', {
          orphanHives: repaired.before.orphanHives,
          orphanInspections: repaired.before.orphanInspections
        })
      );
    }
  }

  openShortcutHelp(): void {
    globalThis.dispatchEvent(new CustomEvent('beez-open-shortcuts'));
  }

  async signInWithGoogle(): Promise<void> {
    if (!this.authConfigured()) {
      this.importMessage.set(this.i18n.t('settings.supabaseNotConfiguredAddKeys'));
      return;
    }

    try {
      await this.supabaseStore.signInWithGoogle(globalThis.location.origin);
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : this.i18n.t('common.unknownError');
      this.importMessage.set(this.i18n.t('settings.googleSignInFailed', { reason }));
    }
  }

  async signOutSupabase(): Promise<void> {
    try {
      await this.supabaseStore.signOut();
      this.authSignedIn.set(false);
      this.authEmail.set('');
      this.importMessage.set(this.i18n.t('settings.signedOutFromSupabase'));
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : this.i18n.t('common.unknownError');
      this.importMessage.set(this.i18n.t('settings.signOutFailed', { reason }));
    }
  }

  async sendMagicLink(): Promise<void> {
    const email = this.authInputEmail().trim();
    if (!email) {
      this.importMessage.set(this.i18n.t('settings.enterEmailFirst'));
      return;
    }

    if (!this.authConfigured()) {
      this.importMessage.set(this.i18n.t('settings.supabaseNotConfiguredAddKeys'));
      return;
    }

    try {
      await this.supabaseStore.signInWithEmailMagicLink(email, globalThis.location.origin);
      localStorage.setItem('beez-auth-email', email);
      this.importMessage.set(this.i18n.t('settings.magicLinkSent'));
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : this.i18n.t('common.unknownError');
      this.importMessage.set(this.i18n.t('settings.magicLinkFailed', { reason }));
    }
  }

  clearOfflineQueue(): void {
    localStorage.setItem('beez-pending-local', '0');
    this.pendingLocalChanges.set(0);
    this.importMessage.set(this.i18n.t('settings.offlineQueueCleared'));
  }

  exportAnalyticsSnapshot(): void {
    const payload = {
      generatedAt: new Date().toISOString(),
      analytics: this.analytics(),
      integrity: this.integrityReport() ?? this.store.getIntegrityReport(),
      queue: {
        pendingLocalChanges: this.pendingLocalChanges(),
        lastSyncAt: this.lastSyncAt()
      }
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `beez-analytics-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    this.importMessage.set(this.i18n.t('settings.analyticsSnapshotExported'));
  }

  updateReminderDays(value: string): void {
    const days = Number(value);
    if (!Number.isFinite(days) || days <= 0) return;
    this.reminderDays.set(days);
    localStorage.setItem('beez-reminder-days', String(days));
    this.importMessage.set(this.i18n.t('settings.inspectionReminderUpdated'));
  }

  private loadReminderDays(): number {
    const raw = Number(localStorage.getItem('beez-reminder-days') ?? '14');
    return Number.isFinite(raw) && raw > 0 ? raw : 14;
  }

  private loadPendingLocalChanges(): number {
    const raw = Number(localStorage.getItem('beez-pending-local') ?? '0');
    return Number.isFinite(raw) && raw > 0 ? raw : 0;
  }

  private async refreshAuthStatus(): Promise<void> {
    if (!this.authConfigured()) {
      this.authSignedIn.set(false);
      this.authEmail.set('');
      return;
    }

    try {
      const hasSession = await this.supabaseStore.hasActiveSession();
      this.authSignedIn.set(hasSession);
      if (!hasSession) {
        this.authEmail.set('');
        return;
      }

      const email = await this.supabaseStore.getCurrentUserEmail();
      this.authEmail.set(email ?? this.i18n.t('settings.signedIn'));
    } catch {
      this.authSignedIn.set(false);
      this.authEmail.set('');
    }
  }

  readonly isUploading = signal(false);

  async uploadLocalToSupabase(): Promise<void> {
    if (!this.isOnline()) {
      this.importMessage.set(this.i18n.t('settings.offlineReconnectBeforeUpload'));
      return;
    }

    if (!this.authConfigured()) {
      this.importMessage.set(this.i18n.t('settings.supabaseNotConfigured'));
      return;
    }

    const data = this.store.getData();
    const total = data.apiaries.length + data.hives.length + data.inspections.length;
    if (total === 0) {
      this.importMessage.set(this.i18n.t('settings.noLocalDataToUpload'));
      return;
    }

    const confirmed = globalThis.confirm(
      this.i18n.t('settings.confirmUploadToSupabase', {
        apiaries: data.apiaries.length,
        hives: data.hives.length,
        inspections: data.inspections.length
      })
    );
    if (!confirmed) return;

    this.isUploading.set(true);
    this.importMessage.set('');
    try {
      await this.supabaseStore.ensureSignedInAnonymously();
      await this.supabaseStore.upsertAll(data);
      this.store.cacheFromRemote(data); // resets pending counter + writes lastSyncAt
      this.importMessage.set(
        this.i18n.t('settings.uploadedToSupabase', {
          apiaries: data.apiaries.length,
          hives: data.hives.length,
          inspections: data.inspections.length
        })
      );
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : this.i18n.t('common.unknownError');
      this.importMessage.set(this.i18n.t('settings.uploadFailed', { reason }));
    } finally {
      this.isUploading.set(false);
    }
  }
}
