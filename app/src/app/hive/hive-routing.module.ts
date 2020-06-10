import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HiveOverviewComponent, HiveEditComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: HiveOverviewComponent
  },
  {
    path: 'create',
    component: HiveEditComponent
  },
  {
    path: 'edit/:name/:number',
    component: HiveEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiveRoutingModule { }
