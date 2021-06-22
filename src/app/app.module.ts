import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { defaultInterpolationFormat, I18NextModule, I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './shared/layout/layout.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { en } from './locales';

export const registerMaterialIcons = (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => () => {
  iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg'));
  iconRegistry.addSvgIcon('beez', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/beez-transparent.svg'));
  iconRegistry.addSvgIcon('beehive', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/beehive.svg'));
  iconRegistry.addSvgIcon('queen', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/queen.svg'));
  iconRegistry.addSvgIcon('qr-code', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/qr-code.svg'));

  return Promise.resolve();
};

export const appInit = (i18next: ITranslationService) => () => i18next.init({
  fallbackLng: 'en',
  debug: false,
  returnEmptyString: false,
  interpolation: { format: I18NextModule.interpolationFormat(defaultInterpolationFormat) },
}).then(() => {
  i18next.addResourceBundle('en', 'translation', en, true, true);
});

export const localeIdFactory = (i18next: ITranslationService) => i18next.language;

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }];

@NgModule({
  declarations: [
    AppComponent
  ],
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
    }),
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: registerMaterialIcons, deps: [MatIconRegistry, DomSanitizer], multi: true },
    I18N_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
