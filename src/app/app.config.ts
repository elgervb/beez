import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';

// @ts-expect-error
globalThis.__SUPABASE_URL__ = "https://rcojqycfdvfhlianfbwp.supabase.co";
// @ts-expect-error
globalThis.__SUPABASE_PUBLISHABLE_KEY__ = "sb_publishable_wc1m3ArUO5hLeTTFY5iHLg_i1j1ee_G";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
