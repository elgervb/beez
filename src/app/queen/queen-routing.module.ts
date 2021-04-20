import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueenComponent, QueenEditComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: QueenComponent
  },
  {
    path: 'add',
    component: QueenEditComponent
  },
  {
    path: 'edit/:queen-id',
    component: QueenEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueenRoutingModule { }
