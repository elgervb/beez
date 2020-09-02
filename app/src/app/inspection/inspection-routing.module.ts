import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InspectionEditComponent } from './containers/inspection-edit/inspection-edit.component';
import { InspectionOverviewComponent } from './containers/inspection-overview/inspection-overview.component';

const routes: Routes = [
  {
    path: ':hiveId',
    component: InspectionOverviewComponent
  },
  {
    path: ':hiveId/create',
    component: InspectionEditComponent
  },
  {
    path: ':hiveId/edit/:inspectionId',
    component: InspectionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionRoutingModule { }
