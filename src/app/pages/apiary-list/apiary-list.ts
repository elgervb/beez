import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { BeeStore, DeletedApiaryBundle } from '../../data/bee-store';
import { ConnectivityService } from '../../data/connectivity.service';
import { ModalService } from '../../data/modal.service';
import { TranslationService } from '../../data/translation.service';
import { Apiary, BeeData } from '../../data/models';
import { TranslatePipe } from '../../ui/pipes/translate.pipe';
import { ApiaryFormComponent } from './apiary-form/apiary-form';
import { ApiaryListViewComponent } from './apiary-list-view/apiary-list-view';
import { AppShellComponent } from '../../ui/app-shell/app-shell';
import { ModalSheetComponent } from '../../ui/modal-sheet/modal-sheet';
import { BadgeComponent } from '../../ui/badge/badge';
import { SearchFilterBarComponent } from '../../ui/search-filter-bar/search-filter-bar';
import { UndoBarComponent } from '../../ui/undo-bar/undo-bar';
import { SupabaseStore } from '../../data/supabase-store';

@Component({
  selector: 'bee-apiary-list',
  imports: [AppShellComponent, ApiaryListViewComponent, ApiaryFormComponent, ModalSheetComponent, BadgeComponent, SearchFilterBarComponent, UndoBarComponent, TranslatePipe],
  templateUrl: './apiary-list.html',
  styleUrl: './apiary-list.css'
})
export class ApiaryListPage implements OnInit {
  private readonly connectivity = inject(ConnectivityService);
  private readonly localStore = inject(BeeStore);
  private readonly remoteStore = inject(SupabaseStore);
  readonly i18n = inject(TranslationService);
  private static readonly SEARCH_KEY = 'beez-filter-apiary-search';
  readonly modal = inject(ModalService);
  readonly data = signal<BeeData>(this.localStore.getData());
  readonly remoteReady = signal(false);
  readonly isSyncing = signal(false);
  readonly syncError = signal('');
  readonly search = signal(localStorage.getItem(ApiaryListPage.SEARCH_KEY) ?? '');
  readonly searchExpanded = signal(this.search().trim().length > 0);
  readonly editingApiary = signal<Apiary | null>(null);
  readonly pendingDeletedApiary = signal<DeletedApiaryBundle | null>(null);

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

  readonly hiveCountByApiary = computed(() => {
    const counts: Record<string, number> = {};
    for (const hive of this.data().hives) {
      counts[hive.apiaryId] = (counts[hive.apiaryId] ?? 0) + 1;
    }
    return counts;
  });

  readonly filteredApiaries = computed(() => {
    const query = this.search().trim().toLowerCase();
    if (!query) return this.data().apiaries;
    return this.data().apiaries.filter((a) =>
      a.name.toLowerCase().includes(query) ||
      a.location.toLowerCase().includes(query)
    );
  });

  setSearch(value: string): void {
    this.search.set(value);
    localStorage.setItem(ApiaryListPage.SEARCH_KEY, value);
  }

  openAdd(): void {
    this.editingApiary.set(null);
    this.modal.open();
  }

  openEdit(apiary: Apiary): void {
    this.editingApiary.set(apiary);
    this.modal.open();
  }

  closeModal(): void {
    this.editingApiary.set(null);
    this.modal.close();
  }

  saveApiary(f: { name: string; location: string; notes: string }): void {
    void this.persistApiary(f);
  }

  deleteApiary(id: string): void {
    void this.removeApiary(id);
  }

  undoDeleteApiary(): void {
    if (this.remoteReady()) {
      void this.restoreDeletedApiaryRemote();
      return;
    }

    const pending = this.pendingDeletedApiary();
    if (!pending) return;
    this.localStore.restoreApiaryBundle(pending);
    this.data.set(this.localStore.getData());
    this.pendingDeletedApiary.set(null);
    this.clearUndoTimer();
    if ('vibrate' in navigator) navigator.vibrate(10);
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

  private async persistApiary(f: { name: string; location: string; notes: string }): Promise<void> {
    if (!f.name.trim() || !f.location.trim()) return;
    const editing = this.editingApiary();

    if (this.remoteReady()) {
      this.isSyncing.set(true);
      try {
        if (editing) {
          await this.remoteStore.updateApiary(editing.id, f);
        } else {
          await this.remoteStore.addApiary(f);
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
      this.localStore.updateApiary(editing.id, f);
    } else {
      this.localStore.addApiary(f);
    }
    this.data.set(this.localStore.getData());
    if ('vibrate' in navigator) navigator.vibrate(10);
    this.closeModal();
  }

  private async removeApiary(id: string): Promise<void> {
    const apiary = this.data().apiaries.find((a) => a.id === id);
    if (!apiary) return;
    const deletedBundle = this.buildDeletedApiaryBundle(id);

    const typed = globalThis.prompt(this.i18n.t('apiary.confirmDeleteWithType', { name: apiary.name }), '');
    if ((typed ?? '').trim() !== apiary.name) return;

    if (this.remoteReady()) {
      this.isSyncing.set(true);
      try {
        await this.remoteStore.deleteApiary(id);
        await this.refreshRemoteData();
        this.pendingDeletedApiary.set(deletedBundle);
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

    const deleted = this.localStore.deleteApiary(id);
    if (!deleted) return;

    this.data.set(this.localStore.getData());
    this.pendingDeletedApiary.set(deleted);
    this.startUndoDeleteWindow();
    if ('vibrate' in navigator) navigator.vibrate(10);
  }

  private startUndoDeleteWindow(): void {
    this.clearUndoTimer();
    this.undoDeleteTimer = setTimeout(() => {
      this.pendingDeletedApiary.set(null);
      this.undoDeleteTimer = null;
    }, 8000);
  }

  private clearUndoTimer(): void {
    if (!this.undoDeleteTimer) return;
    clearTimeout(this.undoDeleteTimer);
    this.undoDeleteTimer = null;
  }

  private buildDeletedApiaryBundle(id: string): DeletedApiaryBundle | null {
    const apiary = this.data().apiaries.find((a) => a.id === id);
    if (!apiary) return null;
    const hives = this.data().hives.filter((h) => h.apiaryId === id);
    const hiveIds = new Set(hives.map((h) => h.id));
    const inspections = this.data().inspections.filter((i) => hiveIds.has(i.hiveId));
    return { apiary, hives, inspections };
  }

  private async restoreDeletedApiaryRemote(): Promise<void> {
    const pending = this.pendingDeletedApiary();
    if (!pending) return;

    const current = this.data();
    const merged: BeeData = {
      apiaries: [pending.apiary, ...current.apiaries.filter((a) => a.id !== pending.apiary.id)],
      hives: [...pending.hives.filter((h) => !current.hives.some((c) => c.id === h.id)), ...current.hives],
      inspections: [
        ...pending.inspections.filter((i) => !current.inspections.some((c) => c.id === i.id)),
        ...current.inspections
      ]
    };

    this.isSyncing.set(true);
    try {
      await this.remoteStore.upsertAll(merged);
      await this.refreshRemoteData();
      this.pendingDeletedApiary.set(null);
      this.clearUndoTimer();
      this.syncError.set('');
      if ('vibrate' in navigator) navigator.vibrate(10);
    } catch {
      this.syncError.set(this.i18n.t('sync.undoFailedSupabase'));
    } finally {
      this.isSyncing.set(false);
    }
  }
}
