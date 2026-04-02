import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';
import { TranslationService } from './data/translation.service';

// @ts-expect-error
globalThis.__SUPABASE_URL__ = "https://rcojqycfdvfhlianfbwp.supabase.co";
// @ts-expect-error
globalThis.__SUPABASE_PUBLISHABLE_KEY__ = "sb_publishable_wc1m3ArUO5hLeTTFY5iHLg_i1j1ee_G";

export function initializeTranslations(): () => Promise<void> {
  return async () => {
    const i18n = inject(TranslationService);
    const lang = i18n.currentLang();
    await i18n.loadLanguage(lang);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      multi: true
    }
  ]
};
