import { Component, OnDestroy, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { ConnectivityService } from '../../data/connectivity.service';

type AppRouteLink = string | readonly (string | number)[];

@Component({
  selector: 'bee-app-shell',
  imports: [RouterLink],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
  host: {
    '(window:keydown)': 'onWindowKeydown($event)'
  }
})
export class AppShellComponent implements OnDestroy {
  private readonly connectivity = inject(ConnectivityService);
  readonly title = input.required<string>();
  readonly eyebrow = input<string>('');
  readonly backLabel = input<string>('');
  readonly backLink = input<AppRouteLink | null>(null);
  readonly tab = input<'apiaries' | 'hives' | 'inspections' | 'settings'>('apiaries');
  readonly apiariesLink = input<AppRouteLink>('/');
  readonly hivesLink = input<AppRouteLink | null>(null);
  readonly inspectionsLink = input<AppRouteLink | null>(null);
  readonly settingsLink = input<AppRouteLink>('/settings');
  readonly updateAvailable = signal(false);
  readonly isOnline = this.connectivity.isOnline;
  readonly reconnectedRecently = this.connectivity.reconnectedRecently;
  readonly showShortcuts = signal(false);
  readonly pendingLocalChanges = signal(this.readPendingChanges());
  readonly flashMessage = signal('');
  private flashTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly onOpenShortcuts = () => this.showShortcuts.set(true);
  private readonly onDataChanged = () => {
    this.pendingLocalChanges.set(this.readPendingChanges());
  };

  constructor() {
    const swUpdate = inject(SwUpdate);
    if (swUpdate.isEnabled) {
      swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          this.updateAvailable.set(true);
        }
      });
    }

    globalThis.addEventListener('beez-open-shortcuts', this.onOpenShortcuts);
    globalThis.addEventListener('beez-data-changed', this.onDataChanged);

    const flash = localStorage.getItem('beez-flash-message');
    if (flash) {
      localStorage.removeItem('beez-flash-message');
      this.showFlash(flash);
    }
  }

  ngOnDestroy(): void {
    globalThis.removeEventListener('beez-open-shortcuts', this.onOpenShortcuts);
    globalThis.removeEventListener('beez-data-changed', this.onDataChanged);
    if (this.flashTimer) clearTimeout(this.flashTimer);
  }

  reloadApp(): void {
    globalThis.location.reload();
  }

  onWindowKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    const tag = (target?.tagName ?? '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || tag === 'select' || target?.isContentEditable;

    if (event.key === '?' && !typing) {
      event.preventDefault();
      this.showShortcuts.set(true);
      return;
    }

    if (event.key === 'Escape' && this.showShortcuts()) {
      this.showShortcuts.set(false);
    }
  }

  closeShortcuts(): void {
    this.showShortcuts.set(false);
  }

  dismissFlash(): void {
    this.flashMessage.set('');
    if (this.flashTimer) {
      clearTimeout(this.flashTimer);
      this.flashTimer = null;
    }
  }

  private readPendingChanges(): number {
    const raw = Number(localStorage.getItem('beez-pending-local') ?? '0');
    return Number.isFinite(raw) && raw > 0 ? raw : 0;
  }

  private showFlash(message: string): void {
    this.flashMessage.set(message);
    if (this.flashTimer) clearTimeout(this.flashTimer);
    this.flashTimer = setTimeout(() => this.flashMessage.set(''), 3500);
  }
}
