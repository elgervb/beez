import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    RouterModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
