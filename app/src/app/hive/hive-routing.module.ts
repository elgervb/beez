import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HiveEditComponent, HiveOverviewComponent } from './containers';

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
