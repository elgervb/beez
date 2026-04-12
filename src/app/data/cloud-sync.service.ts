import { Injectable, inject } from '@angular/core';
import { BeeData } from './models';
import { BeeStore } from './bee-store';
import { SupabaseStore } from './supabase-store';
import { TodoStore } from '../pages/inspection-list/todos/todo-store';

const PENDING_LOCAL_CHANGES_KEY = 'beez-pending-local';

@Injectable({ providedIn: 'root' })
export class CloudSyncService {
  private readonly localStore = inject(BeeStore);
  private readonly remoteStore = inject(SupabaseStore);
  private readonly todoStore = inject(TodoStore);

  async refreshRemoteData(): Promise<BeeData> {
    const [remoteData, remoteTodos] = await Promise.all([
      this.remoteStore.fetchAll(),
      this.remoteStore.fetchTodos()
    ]);
    this.localStore.cacheFromRemote(remoteData);
    this.todoStore.cacheFromRemote(remoteTodos);
    return remoteData;
  }

  async syncPendingLocalThenRefresh(): Promise<BeeData> {
    await this.remoteStore.ensureSignedInAnonymously();

    if (this.hasPendingLocalChanges()) {
      await Promise.all([
        this.remoteStore.upsertAll(this.localStore.getData()),
        this.remoteStore.upsertTodos(this.todoStore.exportData())
      ]);
    }

    return this.refreshRemoteData();
  }

  private hasPendingLocalChanges(): boolean {
    const raw = Number(localStorage.getItem(PENDING_LOCAL_CHANGES_KEY) ?? '0');
    return Number.isFinite(raw) && raw > 0;
  }
}
