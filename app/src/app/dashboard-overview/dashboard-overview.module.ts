import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { TileComponent } from './components';
import { DashboardOverviewComponent } from './containers';
import { DashboardOverviewRoutingModule } from './dashboard-overview-routing.module';

@NgModule({
  declarations: [DashboardOverviewComponent, TileComponent],
  imports: [
    CommonModule,
    DashboardOverviewRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DashboardOverviewModule { }
