import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeeStore } from '../../data/bee-store';
import { ConnectivityService } from '../../data/connectivity.service';
import { ModalService } from '../../data/modal.service';
import { TranslationService } from '../../data/translation.service';
import { BeeData, Inspection } from '../../data/models';
import { TranslatePipe } from '../../ui/pipes/translate.pipe';
import { InspectionFormComponent } from './inspection-form/inspection-form';
import { InspectionListViewComponent } from './inspection-list-view/inspection-list-view';
import { AppShellComponent } from '../../ui/app-shell/app-shell';
import { ModalSheetComponent } from '../../ui/modal-sheet/modal-sheet';
import { InspectionSparklineComponent } from '../../ui/inspection-sparkline/inspection-sparkline';
import { BadgeComponent } from '../../ui/badge/badge';
import { SearchFilterBarComponent } from '../../ui/search-filter-bar/search-filter-bar';
import { UndoBarComponent } from '../../ui/undo-bar/undo-bar';
import { SupabaseStore } from '../../data/supabase-store';

type InspectionFormValue = {
  date: string;
  broodPattern: 'excellent' | 'good' | 'poor';
  storesLevel: 'high' | 'medium' | 'low';
  broodSeen: boolean;
  open: boolean;
  notes: string;
  inspector: string;
};

@Component({
  selector: 'bee-inspection-list',
  imports: [AppShellComponent, InspectionListViewComponent, InspectionFormComponent, ModalSheetComponent, InspectionSparklineComponent, BadgeComponent, SearchFilterBarComponent, UndoBarComponent, TranslatePipe],
  templateUrl: './inspection-list.html',
  styleUrl: './inspection-list.css'
})
export class InspectionListPage implements OnInit {
  private readonly connectivity = inject(ConnectivityService);
  private readonly localStore = inject(BeeStore);
  private readonly remoteStore = inject(SupabaseStore);
  readonly i18n = inject(TranslationService);
  private static readonly SEARCH_KEY = 'beez-filter-inspection-search';
  private static readonly BROOD_KEY = 'beez-filter-inspection-brood';
  private readonly route = inject(ActivatedRoute);
  readonly modal = inject(ModalService);

  readonly apiaryId = this.route.snapshot.params['apiaryId'] as string;
  readonly hiveId = this.route.snapshot.params['hiveId'] as string;

  readonly data = signal<BeeData>(this.localStore.getData());
  readonly remoteReady = signal(false);
  readonly isSyncing = signal(false);
  readonly syncError = signal('');
  readonly hive = computed(() => this.data().hives.find((h) => h.id === this.hiveId));
  readonly apiary = computed(() => this.data().apiaries.find((a) => a.id === this.apiaryId));
  readonly inspections = computed(() =>
    [...this.data().inspections.filter((i) => i.hiveId === this.hiveId)].sort((a, b) =>
      b.date.localeCompare(a.date)
    )
  );
  readonly search = signal(localStorage.getItem(InspectionListPage.SEARCH_KEY) ?? '');
  readonly searchExpanded = signal(this.search().trim().length > 0);
  readonly broodFilter = signal<'all' | 'excellent' | 'good' | 'poor'>(this.loadBroodFilter());
  readonly selectedInspectionIds = signal<string[]>([]);
  readonly filteredInspections = computed(() => {
    const query = this.search().trim().toLowerCase();
    const brood = this.broodFilter();
    return this.inspections().filter((i) => {
      const broodOk = brood === 'all' || i.broodPattern === brood;
      if (!broodOk) return false;
      if (!query) return true;
      return i.date.includes(query) || i.inspector.toLowerCase().includes(query) || i.notes.toLowerCase().includes(query);
    });
  });
  readonly knownInspectors = computed(() => {
    const names = this.data().inspections.map((i) => i.inspector).filter(Boolean);
    return [...new Set(names)].sort((a, b) => a.localeCompare(b));
  });

  readonly editingInspection = signal<Inspection | null>(null);
  readonly pendingDeletedInspection = signal<Inspection | null>(null);
  readonly pendingBulkDeletedInspections = signal<Inspection[] | null>(null);
  readonly shareMessage = signal<string>('');
  readonly undoMessage = computed(() => {
    const bulkDeleted = this.pendingBulkDeletedInspections();
    if (bulkDeleted?.length) return this.i18n.t('inspection.deletedMany', { count: bulkDeleted.length });
    return this.i18n.t('inspection.deleted');
  });
  private shareMessageTimer: ReturnType<typeof setTimeout> | null = null;

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

  openAdd(): void {
    this.editingInspection.set(null);
    this.modal.open();
  }

  openEdit(inspection: Inspection): void {
    this.editingInspection.set(inspection);
    this.modal.open();
  }

  closeModal(): void {
    this.editingInspection.set(null);
    this.modal.close();
  }

  saveInspection(f: InspectionFormValue): void {
    void this.persistInspection(f);
  }

  deleteInspection(id: string): void {
    void this.removeInspection(id);
  }

  toggleInspectionSelection(payload: { id: string; checked: boolean }): void {
    this.selectedInspectionIds.update((ids) => {
      if (payload.checked) return ids.includes(payload.id) ? ids : [...ids, payload.id];
      return ids.filter((id) => id !== payload.id);
    });
  }

  bulkDeleteInspections(): void {
    void this.removeSelectedInspections();
  }

  undoDeleteInspection(): void {
    if (this.remoteReady()) {
      void this.restoreDeletedInspectionRemote();
      return;
    }

    const bulk = this.pendingBulkDeletedInspections();
    if (bulk?.length) {
      for (const inspection of bulk) this.localStore.restoreInspection(inspection);
      this.data.set(this.localStore.getData());
      this.pendingBulkDeletedInspections.set(null);
      this.clearUndoTimer();
      if ('vibrate' in navigator) navigator.vibrate(10);
      return;
    }

    const pending = this.pendingDeletedInspection();
    if (!pending) return;
    this.localStore.restoreInspection(pending);
    this.data.set(this.localStore.getData());
    this.pendingDeletedInspection.set(null);
    this.clearUndoTimer();
    if ('vibrate' in navigator) navigator.vibrate(10);
  }

  async shareReport(): Promise<void> {
    const hive = this.hive();
    const apiary = this.apiary();
    const inspections = this.inspections();
    const lines: string[] = [
      `Hive ${hive?.code ?? ''} — ${apiary?.name ?? ''}`,
      `${inspections.length} inspection${inspections.length === 1 ? '' : 's'}`,
      '',
      ...inspections.map((i) =>
        [
          `${i.date} · ${i.inspector}`,
          `  Brood: ${i.broodPattern}, Stores: ${i.storesLevel}`,
          i.notes ? `  ${i.notes}` : null
        ]
          .filter(Boolean)
          .join('\n')
      )
    ];
    const text = lines.join('\n');
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: `Hive ${hive?.code}`, text });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        this.setShareMessage(this.i18n.t('common.copiedToClipboard'));
      } catch {
        this.setShareMessage(this.i18n.t('inspection.shareUnavailable'));
      }
    }
  }

  setSearch(value: string): void {
    this.search.set(value);
    localStorage.setItem(InspectionListPage.SEARCH_KEY, value);
  }

  setBroodFilter(value: string): void {
    if (value !== 'all' && value !== 'excellent' && value !== 'good' && value !== 'poor') return;
    this.broodFilter.set(value);
    localStorage.setItem(InspectionListPage.BROOD_KEY, value);
  }

  private async initializeData(): Promise<void> {
    if (!this.remoteStore.isConfigured()) {
      this.syncError.set(this.i18n.t('sync.supabaseNotConfiguredLocal'));
      return;
    }

    this.isSyncing.set(true);
    try {
      await this.remoteStore.ensureSignedInAnonymously();
      await this.refreshRemoteData();
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
    const remoteData = await this.remoteStore.fetchAll();
    this.data.set(remoteData);
    this.localStore.cacheFromRemote(remoteData);
  }

  private async handleReconnect(): Promise<void> {
    if (this.hasPendingLocalChanges() || this.isSyncing() || !this.connectivity.isOnline() || !this.remoteStore.isConfigured()) {
      return;
    }

    await this.initializeData();
  }

  private hasPendingLocalChanges(): boolean {
    const raw = Number(localStorage.getItem('beez-pending-local') ?? '0');
    return Number.isFinite(raw) && raw > 0;
  }

  private async persistInspection(f: InspectionFormValue): Promise<void> {
    if (!f.inspector.trim()) return;
    const editing = this.editingInspection();

    if (this.remoteReady()) {
      await this.persistInspectionRemote(editing, f);
      return;
    }

    this.persistInspectionLocal(editing, f);
  }

  private async persistInspectionRemote(editing: Inspection | null, f: InspectionFormValue): Promise<void> {
    this.isSyncing.set(true);
    try {
      if (editing) {
        await this.remoteStore.updateInspection(editing.id, f);
      } else {
        await this.remoteStore.addInspection({
          hiveId: this.hiveId,
          date: f.date,
          broodPattern: f.broodPattern,
          storesLevel: f.storesLevel,
          broodSeen: f.broodSeen,
          open: f.broodSeen ? f.open : false,
          notes: f.notes,
          inspector: f.inspector
        });
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
  }

  private persistInspectionLocal(editing: Inspection | null, f: InspectionFormValue): void {
    if (editing) {
      this.localStore.updateInspection(editing.id, f);
    } else {
      this.localStore.addInspection({
        hiveId: this.hiveId,
        date: f.date,
        broodPattern: f.broodPattern,
        storesLevel: f.storesLevel,
        broodSeen: f.broodSeen,
        open: f.broodSeen ? f.open : false,
        notes: f.notes,
        inspector: f.inspector
      });
    }
    this.data.set(this.localStore.getData());
    if ('vibrate' in navigator) navigator.vibrate(10);
    this.closeModal();
  }

  private async removeInspection(id: string): Promise<void> {
    const inspection = this.inspections().find((i) => i.id === id);
    if (!inspection) return;
    const confirmed = globalThis.confirm(this.i18n.t('inspection.confirmDeleteDate', { date: inspection.date }));
    if (!confirmed) return;

    if (this.remoteReady()) {
      this.isSyncing.set(true);
      try {
        await this.remoteStore.deleteInspection(id);
        await this.refreshRemoteData();
        this.pendingDeletedInspection.set(inspection);
        this.pendingBulkDeletedInspections.set(null);
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

    const deleted = this.localStore.deleteInspection(id);
    if (!deleted) return;
    this.data.set(this.localStore.getData());
    this.pendingBulkDeletedInspections.set(null);
    this.pendingDeletedInspection.set(deleted);
    this.startUndoDeleteWindow();
    if ('vibrate' in navigator) navigator.vibrate(10);
  }

  private async removeSelectedInspections(): Promise<void> {
    const ids = this.selectedInspectionIds();
    if (!ids.length) return;
    const confirmed = globalThis.confirm(this.i18n.t('inspection.confirmDeleteSelected', { count: ids.length }));
    if (!confirmed) return;

    if (this.remoteReady()) {
      this.isSyncing.set(true);
      try {
        await Promise.all(ids.map((id) => this.remoteStore.deleteInspection(id)));
        await this.refreshRemoteData();
        this.pendingDeletedInspection.set(null);
        this.pendingBulkDeletedInspections.set(null);
        this.syncError.set('');
        this.selectedInspectionIds.set([]);
        this.setShareMessage(this.i18n.t('inspection.deletedMany', { count: ids.length }));
      } catch {
        this.syncError.set(this.i18n.t('sync.bulkDeleteFailedSupabase'));
      } finally {
        this.isSyncing.set(false);
      }
      return;
    }

    const deleted: Inspection[] = [];
    for (const id of ids) {
      const item = this.localStore.deleteInspection(id);
      if (item) deleted.push(item);
    }
    if (deleted.length > 0) {
      this.data.set(this.localStore.getData());
      this.pendingDeletedInspection.set(null);
      this.pendingBulkDeletedInspections.set(deleted);
      this.startUndoDeleteWindow();
    }
    this.selectedInspectionIds.set([]);
    this.setShareMessage(this.i18n.t('inspection.deletedMany', { count: deleted.length }));
  }

  private async restoreDeletedInspectionRemote(): Promise<void> {
    const pending = this.pendingDeletedInspection();
    if (!pending) return;

    this.isSyncing.set(true);
    try {
      await this.remoteStore.addInspection({
        hiveId: pending.hiveId,
        date: pending.date,
        broodPattern: pending.broodPattern,
        storesLevel: pending.storesLevel,
        broodSeen: pending.broodSeen,
        open: pending.open,
        notes: pending.notes,
        inspector: pending.inspector
      });
      await this.refreshRemoteData();
      this.pendingDeletedInspection.set(null);
      this.pendingBulkDeletedInspections.set(null);
      this.clearUndoTimer();
      this.syncError.set('');
      if ('vibrate' in navigator) navigator.vibrate(10);
    } catch {
      this.syncError.set(this.i18n.t('sync.undoFailedSupabase'));
    } finally {
      this.isSyncing.set(false);
    }
  }

  private setShareMessage(msg: string): void {
    this.shareMessage.set(msg);
    if (this.shareMessageTimer) clearTimeout(this.shareMessageTimer);
    this.shareMessageTimer = setTimeout(() => this.shareMessage.set(''), 3000);
  }

  private startUndoDeleteWindow(): void {
    this.clearUndoTimer();
    this.undoDeleteTimer = setTimeout(() => {
      this.pendingDeletedInspection.set(null);
      this.pendingBulkDeletedInspections.set(null);
      this.undoDeleteTimer = null;
    }, 8000);
  }

  private clearUndoTimer(): void {
    if (!this.undoDeleteTimer) return;
    clearTimeout(this.undoDeleteTimer);
    this.undoDeleteTimer = null;
  }

  private loadBroodFilter(): 'all' | 'excellent' | 'good' | 'poor' {
    const value = localStorage.getItem(InspectionListPage.BROOD_KEY);
    if (value === 'excellent' || value === 'good' || value === 'poor') return value;
    return 'all';
  }
}
