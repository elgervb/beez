import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';

const routes: Routes = [ { path: 'shell', component: AppShellComponent }];

@NgModule({
  imports: [
    AppModule,
    MatProgressSpinnerModule,
    ServerModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppShellComponent
  ],
})
export class AppServerModule {}
