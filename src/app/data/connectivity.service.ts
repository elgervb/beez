import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConnectivityService {
  readonly isOnline = signal(globalThis.navigator.onLine);
  readonly reconnectCount = signal(0);
  readonly reconnectedRecently = signal(false);

  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    globalThis.addEventListener('online', this.handleOnline);
    globalThis.addEventListener('offline', this.handleOffline);
  }

  private readonly handleOnline = () => {
    const wasOffline = !this.isOnline();
    this.isOnline.set(true);
    if (!wasOffline) return;

    this.reconnectCount.update((count) => count + 1);
    this.reconnectedRecently.set(true);
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.reconnectTimer = setTimeout(() => {
      this.reconnectedRecently.set(false);
      this.reconnectTimer = null;
    }, 4000);
  };

  private readonly handleOffline = () => {
    this.isOnline.set(false);
    this.reconnectedRecently.set(false);
    if (!this.reconnectTimer) return;
    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
  };
}
