import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationComponent } from './containers/location/location.component';
import { LocationFormComponent } from './containers/location-form/location-form.component';

const routes: Routes = [
  {
    path: '',
    component: LocationComponent
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
