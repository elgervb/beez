import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers';
import { MaterialModule } from '../shared/material/material.module';
import { I18NextModule } from 'angular-i18next';

@NgModule({
  declarations: [ DashboardComponent ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    I18NextModule,
    MaterialModule,
  ]
})
export class DashboardModule { }
