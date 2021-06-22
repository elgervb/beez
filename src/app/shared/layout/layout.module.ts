import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { CenteredLayoutComponent } from './centered-layout/centered-layout.component';
import { I18NextModule } from 'angular-i18next';

@NgModule({
  declarations: [
    MainLayoutComponent,
    CenteredLayoutComponent,
  ],
  imports: [
    CommonModule,
    I18NextModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    MaterialModule,
    RouterModule
  ]
})
export class LayoutModule { }
