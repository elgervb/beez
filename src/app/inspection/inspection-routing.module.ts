import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionAddComponent, InspectionListComponent } from './containers';

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
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class InspectionRoutingModule { }
