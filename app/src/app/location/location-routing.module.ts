import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationEditComponent, LocationOverviewComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: LocationOverviewComponent
  },
  {
    path: 'create',
    component: LocationEditComponent
  },
  {
    path: 'edit/:name',
    component: LocationEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
