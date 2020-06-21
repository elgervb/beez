import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QueenEditComponent, QueenOverviewComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: QueenOverviewComponent
  },
  {
    path: 'create',
    component: QueenEditComponent
  },
  {
    path: 'edit/:name',
    component: QueenEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueenRoutingModule { }
