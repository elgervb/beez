import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiveListComponent, HiveDetailsComponent, HiveEditComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: HiveListComponent
  },
  {
    path: 'add',
    component: HiveEditComponent
  },
  {
    path: 'details/:hiveId',
    component: HiveDetailsComponent
  },
  {
    path: 'edit/:hiveId',
    component: HiveEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiveRoutingModule { }
