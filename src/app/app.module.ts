import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { defaultInterpolationFormat, I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { AuthModule, AuthService } from 'auth';
import { LayoutModule } from './shared/layout/layout.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { en, nl } from './locales';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { PreferencesService } from './shared/services/preferences.service';
import { filter, lastValueFrom, switchMap, take, tap } from 'rxjs';
import { LanguageService } from './shared/services/language.service';


export const registerMaterialIcons = (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => () => {
  iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg'))
    .addSvgIcon('beez', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/beez-transparent.svg'))
    .addSvgIcon('beehive', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/beehive.svg'))
    .addSvgIcon('queen', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/queen.svg'))
    .addSvgIcon('flag-nl', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/flag-nl.svg'))
    .addSvgIcon('flag-en', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/flag-en.svg'))
    .addSvgIcon('qr-code', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/qr-code.svg'));

  return Promise.resolve();
};

export const appInit = (i18next: ITranslationService) => () => i18next.init({
  fallbackLng: 'en',
  debug: !environment.production,
  returnEmptyString: false,
  interpolation: { format: I18NextModule.interpolationFormat(defaultInterpolationFormat) },
}).then(() => {
  i18next.addResourceBundle('en', 'translation', en, true, true);
  i18next.addResourceBundle('nl', 'translation', nl, true, true);
});

export const localeIdFactory = (i18next: ITranslationService) => i18next.language;

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

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function initializeApp(authService: AuthService, preferencesService: PreferencesService, languageService: LanguageService) {
  return (): Promise<unknown> => lastValueFrom(authService.user$.pipe(
    filter(user => !!user),
    switchMap(() => preferencesService.get().pipe(filter(prefs => !!prefs))),
    tap(prefs => console.log(prefs)),
    switchMap(prefs => languageService.changeLanguage(prefs?.language)),
    take(1)
  ));
}

registerLocaleData(localeNl, 'nl');

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule, // needed for mat-icon registry
    RouterModule,
    LayoutModule,
    I18NextModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: registerMaterialIcons, deps: [ MatIconRegistry, DomSanitizer ], multi: true },
    I18N_PROVIDERS,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ AuthService, PreferencesService, LanguageService ], multi: true }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
