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
    path: ':hiveId',
    children: [
      {
        path: '',
        component: HiveDetailsComponent,
      },
      {
        path: 'edit',
        component: HiveEditComponent
      },
    ]
  },
  {
    path: ':hiveId',
    component: HiveDetailsComponent,
    data: { dense: true },
    children: [
      {
        path: 'inspections',
        loadChildren: () => import('../inspection/inspection.module').then(m => m.InspectionModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiveRoutingModule { }
