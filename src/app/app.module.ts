import { APP_INITIALIZER, isDevMode, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';

export function appInit(i18next: ITranslationService) {
  return () => i18next.init({
    supportedLngs: [ 'en', 'nl' ],
    fallbackLng: 'en',
    debug: true,
    returnEmptyString: false,
    ns: [ 'translation' ],
  });
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [ I18NEXT_SERVICE ],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [ I18NEXT_SERVICE ],
    useFactory: localeIdFactory
  }
];

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    I18NextModule.forRoot(),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    RouterModule,
    provideFirebaseApp(() => initializeApp({ 'projectId': 'beez-6f2c5', 'appId': '1:280318214840:web:c054a3e372247afc432a4d', 'storageBucket': 'beez-6f2c5.appspot.com', 'apiKey': 'AIzaSyDky1CHqZKZ-GyE6O3RNXILNydBZIBVAHI', 'authDomain': 'beez-6f2c5.firebaseapp.com', 'messagingSenderId': '280318214840', 'measurementId': 'G-XDN9847E53' })), // "locationId":"europe-west",
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
