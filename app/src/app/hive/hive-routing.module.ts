import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HiveOverviewComponent } from './containers/hive-overview/hive-overview.component';
import { HiveFormComponent } from './containers/hive-form/hive-form.component';

const routes: Routes = [
  {
    path: '',
    component: HiveOverviewComponent
  },
  {
    path: 'create',
    component: HiveFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiveRoutingModule { }
