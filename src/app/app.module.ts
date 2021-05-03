import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
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

export const registerMaterialIcons = (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => () => {
  iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/google.svg'));
  iconRegistry.addSvgIcon('beez', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/beez-transparent.svg'));

  return Promise.resolve();
};
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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: registerMaterialIcons, deps: [MatIconRegistry, DomSanitizer], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
