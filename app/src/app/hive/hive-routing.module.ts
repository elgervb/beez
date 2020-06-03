import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HiveComponent } from './containers/hives/hive.component';
import { HiveFormComponent } from './containers/hive-form/hive-form.component';

const routes: Routes = [
  {
    path: '',
    component: HiveComponent
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
