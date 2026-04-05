import { Injectable, inject } from '@angular/core';
import { BeeData } from './models';
import { BeeStore } from './bee-store';
import { SupabaseStore } from './supabase-store';

const PENDING_LOCAL_CHANGES_KEY = 'beez-pending-local';

@Injectable({ providedIn: 'root' })
export class CloudSyncService {
  private readonly localStore = inject(BeeStore);
  private readonly remoteStore = inject(SupabaseStore);

  async refreshRemoteData(): Promise<BeeData> {
    const remoteData = await this.remoteStore.fetchAll();
    this.localStore.cacheFromRemote(remoteData);
    return remoteData;
  }

  async syncPendingLocalThenRefresh(): Promise<BeeData> {
    await this.remoteStore.ensureSignedInAnonymously();

    if (this.hasPendingLocalChanges()) {
      await this.remoteStore.upsertAll(this.localStore.getData());
    }

    return this.refreshRemoteData();
  }

  private hasPendingLocalChanges(): boolean {
    const raw = Number(localStorage.getItem(PENDING_LOCAL_CHANGES_KEY) ?? '0');
    return Number.isFinite(raw) && raw > 0;
  }
}
