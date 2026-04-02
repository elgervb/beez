import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseStore } from '../../data/supabase-store';
import { TranslationService } from '../../data/translation.service';
import { TranslatePipe } from '../../ui/pipes/translate.pipe';

type AuthMode = 'login' | 'register';

@Component({
  selector: 'bee-auth',
  imports: [TranslatePipe],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthPage implements OnInit {
  private readonly supabaseStore = inject(SupabaseStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly i18n = inject(TranslationService);

  readonly email = signal(localStorage.getItem('beez-auth-email') ?? '');
  readonly password = signal('');
  readonly busy = signal(false);
  readonly message = signal('');
  readonly configured = signal(this.supabaseStore.isConfigured());
  readonly mode = signal<AuthMode>('login');

  ngOnInit(): void {
    void this.redirectIfAuthenticated();
  }

  setMode(mode: AuthMode): void {
    this.mode.set(mode);
    this.message.set('');
    this.password.set('');
  }

  async signInWithEmailPassword(): Promise<void> {
    const email = this.email().trim();
    const password = this.password();
    if (!email || !password) {
      this.message.set(this.i18n.t('auth.enterCredentials'));
      return;
    }
    if (!this.configured()) {
      this.message.set(this.i18n.t('auth.notConfiguredApp'));
      return;
    }

    this.busy.set(true);
    this.message.set('');
    try {
      await this.supabaseStore.signInWithEmailPassword(email, password);
      localStorage.setItem('beez-auth-email', email);
      const redirect = this.safeRedirectPath();
      await this.router.navigateByUrl(redirect);
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : 'Unknown error';
      this.message.set(this.i18n.t('auth.signInFailed', { reason }));
    } finally {
      this.busy.set(false);
    }
  }

  async register(): Promise<void> {
    const email = this.email().trim();
    const password = this.password();
    if (!email || !password) {
      this.message.set(this.i18n.t('auth.enterCredentials'));
      return;
    }
    if (password.length < 6) {
      this.message.set(this.i18n.t('auth.passwordMinLength'));
      return;
    }
    if (!this.configured()) {
      this.message.set(this.i18n.t('auth.notConfiguredApp'));
      return;
    }

    this.busy.set(true);
    this.message.set('');
    try {
      await this.supabaseStore.signUpWithEmailPassword(email, password);
      localStorage.setItem('beez-auth-email', email);
      this.message.set(this.i18n.t('auth.accountCreated'));
      this.setMode('login');
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : 'Unknown error';
      this.message.set(this.i18n.t('auth.registrationFailed', { reason }));
    } finally {
      this.busy.set(false);
    }
  }

  private async redirectIfAuthenticated(): Promise<void> {
    if (!this.configured()) return;

    try {
      const hasSession = await this.supabaseStore.hasActiveSession();
      if (!hasSession) return;

      const redirect = this.safeRedirectPath();
      await this.router.navigateByUrl(redirect);
    } catch {
      // Stay on auth screen and let user retry.
    }
  }

  private safeRedirectPath(): string {
    const redirect = this.route.snapshot.queryParamMap.get('redirect') ?? '/';
    if (!redirect.startsWith('/') || redirect.startsWith('/auth')) return '/';
    return redirect;
  }
}
