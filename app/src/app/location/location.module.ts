import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './containers/location/location.component';
import { LocationFormComponent } from './containers/location-form/location-form.component';


@NgModule({
  declarations: [
    LocationComponent,
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule
  ]
})
export class LocationModule { }
