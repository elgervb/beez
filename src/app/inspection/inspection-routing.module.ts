import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionListComponent } from './containers';
import { InspectionAddComponent } from './containers/inspection-add/inspection-add.component';

const routes: Routes = [
  {
    path: '',
    component: InspectionListComponent
  },
  {
    path: 'add',
    component: InspectionAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionRoutingModule { }
