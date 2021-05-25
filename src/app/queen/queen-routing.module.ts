import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueenListComponent, QueenEditComponent, QueenDetailsComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: QueenListComponent
  },
  {
    path: 'add',
    component: QueenEditComponent
  },
  {
    path: 'edit/:queenId',
    component: QueenEditComponent
  }
  ,
  {
    path: ':queenId',
    component: QueenDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueenRoutingModule { }
