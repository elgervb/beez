import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueenOverviewComponent, QueenFormComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: QueenOverviewComponent
  },
  {
    path: 'create',
    component: QueenFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueenRoutingModule { }
