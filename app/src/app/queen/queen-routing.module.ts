import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueenOverviewComponent, QueenEditComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: QueenOverviewComponent
  },
  {
    path: 'create',
    component: QueenEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueenRoutingModule { }
