import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueenComponent } from './containers/queen/queen.component';
import { QueenFormComponent } from './containers/queen-form/queen-form.component';

const routes: Routes = [
  {
    path: '',
    component: QueenComponent
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
