import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiveComponent, HiveEditComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: HiveComponent
  },
  {
    path: 'add',
    component: HiveEditComponent
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
