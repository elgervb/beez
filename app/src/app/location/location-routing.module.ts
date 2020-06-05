import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationOverviewComponent } from './containers/location-overview/location-overview.component';
import { LocationFormComponent } from './containers/location-form/location-form.component';

const routes: Routes = [
  {
    path: '',
    component: LocationOverviewComponent
  },
  {
    path: 'create',
    component: LocationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
