import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseStore } from '../../data/supabase-store';

@Component({
  selector: 'bee-auth',
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthPage implements OnInit {
  private readonly supabaseStore = inject(SupabaseStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly email = signal(localStorage.getItem('beez-auth-email') ?? '');
  readonly busy = signal(false);
  readonly message = signal('');
  readonly configured = signal(this.supabaseStore.isConfigured());

  ngOnInit(): void {
    void this.redirectIfAuthenticated();
  }

  async sendMagicLink(): Promise<void> {
    const value = this.email().trim();
    if (!value) {
      this.message.set('Enter your email first.');
      return;
    }

    if (!this.configured()) {
      this.message.set('Supabase is not configured in this app.');
      return;
    }

    const redirect = this.safeRedirectPath();
    const redirectTo = `${globalThis.location.origin}/auth?redirect=${encodeURIComponent(redirect)}`;

    this.busy.set(true);
    this.message.set('');
    try {
      await this.supabaseStore.signInWithEmailMagicLink(value, redirectTo);
      localStorage.setItem('beez-auth-email', value);
      this.message.set('Magic link sent. Open your email and continue sign-in.');
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : 'Unknown error';
      this.message.set(`Could not send magic link: ${reason}`);
    } finally {
      this.busy.set(false);
    }
  }

  async signInWithGoogle(): Promise<void> {
    if (!this.configured()) {
      this.message.set('Supabase is not configured in this app.');
      return;
    }

    const redirect = this.safeRedirectPath();
    const redirectTo = `${globalThis.location.origin}/auth?redirect=${encodeURIComponent(redirect)}`;

    this.busy.set(true);
    this.message.set('');
    try {
      await this.supabaseStore.signInWithGoogle(redirectTo);
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : 'Unknown error';
      this.message.set(`Google sign-in failed: ${reason}`);
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
