import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeeStore, DeletedHiveBundle } from '../../data/bee-store';
import { ConnectivityService } from '../../data/connectivity.service';
import { ModalService } from '../../data/modal.service';
import { TranslationService } from '../../data/translation.service';
import { BeeData, Hive } from '../../data/models';
import { TranslatePipe } from '../../ui/pipes/translate.pipe';
import { HiveFormComponent } from './hive-form/hive-form';
import { HiveListViewComponent } from './hive-list-view/hive-list-view';
import { AppShellComponent } from '../../ui/app-shell/app-shell';
import { ModalSheetComponent } from '../../ui/modal-sheet/modal-sheet';
import { BadgeComponent } from '../../ui/badge/badge';
import { UndoBarComponent } from '../../ui/undo-bar/undo-bar';
import { SupabaseStore } from '../../data/supabase-store';
import { CloudSyncService } from '../../data/cloud-sync.service';
import { FilterPanelComponent, BulkAction, FilterOption } from '../../ui/filter-panel/filter-panel';

type HiveFormValue = {
  code: string;
  queenYear: number;
  temperament: 'calm' | 'mixed' | 'defensive';
  status: 'active' | 'weak' | 'wintering';
  notes?: string;
};

@Component({
  selector: 'bee-hive-list',
  imports: [AppShellComponent, HiveListViewComponent, HiveFormComponent, ModalSheetComponent, BadgeComponent, UndoBarComponent, TranslatePipe, FilterPanelComponent],
  templateUrl: './hive-list.html',
  styleUrl: './hive-list.css'
})
export class HiveListPage implements OnInit {
  private readonly connectivity = inject(ConnectivityService);
  private readonly localStore = inject(BeeStore);
  private readonly remoteStore = inject(SupabaseStore);
  private readonly cloudSync = inject(CloudSyncService);
  readonly i18n = inject(TranslationService);
  private static readonly SEARCH_KEY = 'beez-filter-hive-search';
  private static readonly STATUS_KEY = 'beez-filter-hive-status';
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly modal = inject(ModalService);

  readonly apiaryId = this.route.snapshot.params['apiaryId'] as string;

  readonly data = signal<BeeData>(this.localStore.getData());
  readonly remoteReady = signal(false);
  readonly isSyncing = signal(false);
  readonly syncError = signal('');
  readonly apiary = computed(() => this.data().apiaries.find((a) => a.id === this.apiaryId));
  readonly hives = computed(() => this.data().hives.filter((h) => h.apiaryId === this.apiaryId));
  readonly search = signal(localStorage.getItem(HiveListPage.SEARCH_KEY) ?? '');
  readonly searchExpanded = signal(this.search().trim().length > 0);
  readonly statusFilter = signal<'all' | 'active' | 'weak' | 'wintering'>(this.loadStatusFilter());
  readonly selectedHiveIds = signal<string[]>([]);
  readonly editingHive = signal<Hive | null>(null);
  readonly pendingDeletedHive = signal<DeletedHiveBundle | null>(null);
  readonly reminderDays = signal<number>(this.loadReminderDays());

  readonly hiveFilterOptions: FilterOption[] = [
    { value: 'all', labelKey: 'common.all' },
    { value: 'active', labelKey: 'hive.status.active' },
    { value: 'weak', labelKey: 'hive.status.weak' },
    { value: 'wintering', labelKey: 'hive.status.wintering' }
  ];

  readonly hiveBulkActions: BulkAction[] = [
    { value: 'active', labelKey: 'hive.status.active' },
    { value: 'weak', labelKey: 'hive.status.weak' },
    { value: 'wintering', labelKey: 'hive.status.wintering' }
  ];

  private undoDeleteTimer: ReturnType<typeof setTimeout> | null = null;
  private lastReconnectHandled = 0;

  constructor() {
    effect(() => {
      const reconnectCount = this.connectivity.reconnectCount();
      if (reconnectCount === 0 || reconnectCount === this.lastReconnectHandled) return;
      this.lastReconnectHandled = reconnectCount;
      void this.handleReconnect();
    });
  }

  ngOnInit(): void {
    void this.initializeData();
  }

  readonly inspectionLabels = computed(() => {
    const labels: Record<string, string> = {};
    for (const hive of this.hives()) {
      labels[hive.id] = this.lastInspectionLabel(hive.id);
    }
    return labels;
  });

  readonly healthScores = computed(() => {
    const scores: Record<string, number> = {};
    for (const hive of this.hives()) {
      scores[hive.id] = this.computeHealthScore(hive.id);
    }
    return scores;
  });

  readonly dueLabels = computed(() => {
    const labels: Record<string, string> = {};
    for (const hive of this.hives()) {
      labels[hive.id] = this.computeDueLabel(hive.id);
    }
    return labels;
  });

  readonly isDueByHive = computed(() => {
    const flags: Record<string, boolean> = {};
    for (const hive of this.hives()) {
      flags[hive.id] = this.computeDue(hive.id);
    }
    return flags;
  });

  readonly trendLabels = computed(() => {
    const labels: Record<string, 'Improving' | 'Stable' | 'Declining'> = {};
    for (const hive of this.hives()) {
      labels[hive.id] = this.computeTrend(hive.id);
    }
    return labels;
  });

  readonly dueNowHives = computed(() => {
    return this.hives()
      .map((hive) => ({
        id: hive.id,
        code: hive.code,
        status: hive.status,
        label: this.computeDueLabel(hive.id),
        isDue: this.computeDue(hive.id)
      }))
      .filter((hive) => hive.isDue);
  });

  readonly filteredHives = computed(() => {
    const query = this.search().trim().toLowerCase();
    const status = this.statusFilter();
    return this.hives().filter((h) => {
      const statusOk = status === 'all' || h.status === status;
      if (!statusOk) return false;
      if (!query) return true;
      return h.code.toLowerCase().includes(query) || (h.notes ?? '').toLowerCase().includes(query);
    });
  });

  setSearch(value: string): void {
    this.search.set(value);
    localStorage.setItem(HiveListPage.SEARCH_KEY, value);
  }

  setStatusFilter(value: string): void {
    if (value !== 'all' && value !== 'active' && value !== 'weak' && value !== 'wintering') return;
    this.statusFilter.set(value);
    localStorage.setItem(HiveListPage.STATUS_KEY, value);
  }

  openAdd(): void {
    this.editingHive.set(null);
    this.modal.open();
  }

  openEdit(hive: Hive): void {
    this.editingHive.set(hive);
    this.modal.open();
  }

  closeModal(): void {
    this.editingHive.set(null);
    this.modal.close();
  }

  saveHive(f: HiveFormValue): void {
    void this.persistHive(f);
  }

  toggleHiveSelection(payload: { id: string; checked: boolean }): void {
    this.selectedHiveIds.update((ids) => {
      if (payload.checked) return ids.includes(payload.id) ? ids : [...ids, payload.id];
      return ids.filter((id) => id !== payload.id);
    });
  }

  applyBulkStatus(status: 'active' | 'weak' | 'wintering'): void {
    void this.persistBulkStatus(status);
  }

  onBulkActionSelected(value: string): void {
    if (value === 'active' || value === 'weak' || value === 'wintering') {
      this.applyBulkStatus(value);
    }
  }

  deleteHive(id: string): void {
    void this.removeHive(id);
  }

  undoDeleteHive(): void {
    if (this.remoteReady()) {
      void this.restoreDeletedHiveRemote();
      return;
    }

    const pending = this.pendingDeletedHive();
    if (!pending) return;
    this.localStore.restoreHiveBundle(pending);
    this.data.set(this.localStore.getData());
    this.pendingDeletedHive.set(null);
    this.clearUndoTimer();
    if ('vibrate' in navigator) navigator.vibrate(10);
  }

  openHiveInspections(hiveId: string): void {
    void this.router.navigate(['/apiary', this.apiaryId, 'hive', hiveId]);
  }

  lastInspectionLabel(hiveId: string): string {
    const inspections = this.data().inspections.filter((i) => i.hiveId === hiveId);
    if (!inspections.length) return this.i18n.t('hive.noInspections');
    const latest = [...inspections].sort((a, b) => b.date.localeCompare(a.date))[0];
    const days = Math.floor((Date.now() - new Date(latest.date).getTime()) / (1000 * 60 * 60 * 24));
    return days === 0 ? this.i18n.t('common.today') : this.i18n.t('common.daysAgoShort', { days });
  }

  private async initializeData(): Promise<void> {
    if (!this.remoteStore.isConfigured()) {
      this.syncError.set(this.i18n.t('sync.supabaseNotConfiguredLocal'));
      return;
    }

    this.isSyncing.set(true);
    try {
      this.data.set(await this.cloudSync.syncPendingLocalThenRefresh());
      this.remoteReady.set(true);
      this.syncError.set('');
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : 'Unknown error';
      this.remoteReady.set(false);
      this.syncError.set(`Could not connect to Supabase (${reason}). Using local storage.`);
    } finally {
      this.isSyncing.set(false);
    }
  }

  private async refreshRemoteData(): Promise<void> {
    this.data.set(await this.cloudSync.refreshRemoteData());
  }

  private async handleReconnect(): Promise<void> {
    if (this.isSyncing() || !this.connectivity.isOnline() || !this.remoteStore.isConfigured()) {
      return;
    }

    await this.initializeData();
  }

  private async persistHive(f: HiveFormValue): Promise<void> {
    if (!f.code.trim()) return;
    const editing = this.editingHive();

    if (this.remoteReady()) {
      this.isSyncing.set(true);
      try {
        if (editing) {
          await this.remoteStore.updateHive(editing.id, f);
        } else {
          await this.remoteStore.addHive({ apiaryId: this.apiaryId, ...f });
        }
        await this.refreshRemoteData();
        this.syncError.set('');
        if ('vibrate' in navigator) navigator.vibrate(10);
        this.closeModal();
      } catch {
        this.syncError.set(this.i18n.t('sync.saveFailedSupabase'));
      } finally {
        this.isSyncing.set(false);
      }
      return;
    }

    if (editing) {
      this.localStore.updateHive(editing.id, f);
    } else {
      this.localStore.addHive({ apiaryId: this.apiaryId, ...f });
    }
    this.data.set(this.localStore.getData());
    if ('vibrate' in navigator) navigator.vibrate(10);
    this.closeModal();
  }

  private async persistBulkStatus(status: 'active' | 'weak' | 'wintering'): Promise<void> {
    const ids = new Set(this.selectedHiveIds());
    if (!ids.size) return;

    if (this.remoteReady()) {
      this.isSyncing.set(true);
      try {
        const updates = this.hives()
          .filter((h) => ids.has(h.id))
          .map((hive) =>
            this.remoteStore.updateHive(hive.id, {
              code: hive.code,
              queenYear: hive.queenYear,
              temperament: hive.temperament,
              status,
              notes: hive.notes
            })
          );
        await Promise.all(updates);
        await this.refreshRemoteData();
        this.syncError.set('');
        this.selectedHiveIds.set([]);
      } catch {
        this.syncError.set(this.i18n.t('sync.bulkUpdateFailedSupabase'));
      } finally {
        this.isSyncing.set(false);
      }
      return;
    }

    for (const hive of this.hives().filter((h) => ids.has(h.id))) {
      this.localStore.updateHive(hive.id, {
        code: hive.code,
        queenYear: hive.queenYear,
        temperament: hive.temperament,
        status,
        notes: hive.notes
      });
    }
    this.data.set(this.localStore.getData());
    this.selectedHiveIds.set([]);
  }

  private async removeHive(id: string): Promise<void> {
    const hive = this.hives().find((h) => h.id === id);
    if (!hive) return;
    const deletedBundle = this.buildDeletedHiveBundle(id);
    const confirmed = globalThis.confirm(this.i18n.t('hive.confirmDelete', { code: hive.code }));
    if (!confirmed) return;

    if (this.remoteReady()) {
      this.isSyncing.set(true);
      try {
        await this.remoteStore.deleteHive(id);
        await this.refreshRemoteData();
        this.pendingDeletedHive.set(deletedBundle);
        this.startUndoDeleteWindow();
        this.syncError.set('');
        if ('vibrate' in navigator) navigator.vibrate(10);
      } catch {
        this.syncError.set(this.i18n.t('sync.deleteFailedSupabase'));
      } finally {
        this.isSyncing.set(false);
      }
      return;
    }

    const deleted = this.localStore.deleteHive(id);
    if (!deleted) return;
    this.data.set(this.localStore.getData());
    this.pendingDeletedHive.set(deleted);
    this.startUndoDeleteWindow();
    if ('vibrate' in navigator) navigator.vibrate(10);
  }

  private loadReminderDays(): number {
    const raw = Number(localStorage.getItem('beez-reminder-days') ?? '14');
    return Number.isFinite(raw) && raw > 0 ? raw : 14;
  }

  private loadStatusFilter(): 'all' | 'active' | 'weak' | 'wintering' {
    const value = localStorage.getItem(HiveListPage.STATUS_KEY);
    if (value === 'active' || value === 'weak' || value === 'wintering') return value;
    return 'all';
  }

  private startUndoDeleteWindow(): void {
    this.clearUndoTimer();
    this.undoDeleteTimer = setTimeout(() => {
      this.pendingDeletedHive.set(null);
      this.undoDeleteTimer = null;
    }, 8000);
  }

  private clearUndoTimer(): void {
    if (!this.undoDeleteTimer) return;
    clearTimeout(this.undoDeleteTimer);
    this.undoDeleteTimer = null;
  }

  private buildDeletedHiveBundle(id: string): DeletedHiveBundle | null {
    const hive = this.hives().find((h) => h.id === id);
    if (!hive) return null;
    const inspections = this.data().inspections.filter((i) => i.hiveId === id);
    return { hive, inspections };
  }

  private async restoreDeletedHiveRemote(): Promise<void> {
    const pending = this.pendingDeletedHive();
    if (!pending) return;

    const current = this.data();
    const merged: BeeData = {
      apiaries: current.apiaries,
      hives: [pending.hive, ...current.hives.filter((h) => h.id !== pending.hive.id)],
      inspections: [
        ...pending.inspections.filter((i) => !current.inspections.some((c) => c.id === i.id)),
        ...current.inspections
      ]
    };

    this.isSyncing.set(true);
    try {
      await this.remoteStore.upsertAll(merged);
      await this.refreshRemoteData();
      this.pendingDeletedHive.set(null);
      this.clearUndoTimer();
      this.syncError.set('');
      if ('vibrate' in navigator) navigator.vibrate(10);
    } catch {
      this.syncError.set(this.i18n.t('sync.undoFailedSupabase'));
    } finally {
      this.isSyncing.set(false);
    }
  }

  private latestInspectionForHive(hiveId: string) {
    const inspections = this.data().inspections.filter((i) => i.hiveId === hiveId);
    if (!inspections.length) return null;
    return [...inspections].sort((a, b) => b.date.localeCompare(a.date))[0];
  }

  private daysSince(date: string): number {
    return Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
  }

  private computeHealthScore(hiveId: string): number {
    const hive = this.hives().find((h) => h.id === hiveId);
    if (!hive) return 0;
    const latest = this.latestInspectionForHive(hiveId);
    if (!latest) return 35;

    let score = 50;
    let broodDelta = -15;
    if (latest.broodPattern === 'excellent') broodDelta = 20;
    else if (latest.broodPattern === 'good') broodDelta = 10;

    let storesDelta = -15;
    if (latest.storesLevel === 'high') storesDelta = 15;
    else if (latest.storesLevel === 'medium') storesDelta = 5;

    score += broodDelta;
    score += storesDelta;
    if (hive.status === 'weak') score -= 15;
    if (hive.status === 'wintering') score -= 5;

    const recency = this.daysSince(latest.date);
    if (recency > 35) score -= 25;
    else if (recency > 21) score -= 12;

    return Math.max(0, Math.min(100, score));
  }

  private computeDue(hiveId: string): boolean {
    const latest = this.latestInspectionForHive(hiveId);
    if (!latest) return true;
    return this.daysSince(latest.date) >= this.reminderDays();
  }

  private computeDueLabel(hiveId: string): string {
    const latest = this.latestInspectionForHive(hiveId);
    if (!latest) return 'Due now';
    const since = this.daysSince(latest.date);
    const delta = since - this.reminderDays();
    if (delta >= 0) return delta === 0 ? 'Due today' : `${delta}d overdue`;
    return `${Math.abs(delta)}d left`;
  }

  private computeTrend(hiveId: string): 'Improving' | 'Stable' | 'Declining' {
    const inspections = [...this.data().inspections.filter((i) => i.hiveId === hiveId)].sort((a, b) => b.date.localeCompare(a.date));
    if (inspections.length < 2) return 'Stable';

    const toScore = (brood: 'excellent' | 'good' | 'poor', stores: 'high' | 'medium' | 'low') => {
      let broodScore = 1;
      if (brood === 'excellent') broodScore = 3;
      else if (brood === 'good') broodScore = 2;

      let storesScore = 1;
      if (stores === 'high') storesScore = 3;
      else if (stores === 'medium') storesScore = 2;

      return broodScore + storesScore;
    };

    const latest = toScore(inspections[0].broodPattern, inspections[0].storesLevel);
    const previous = toScore(inspections[1].broodPattern, inspections[1].storesLevel);
    if (latest > previous) return 'Improving';
    if (latest < previous) return 'Declining';
    return 'Stable';
  }
}
