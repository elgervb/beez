import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardOverviewComponent } from './containers';

const routes: Routes = [{ path: '', component: DashboardOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardOverviewRoutingModule { }
