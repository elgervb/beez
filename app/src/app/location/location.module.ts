import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LocationRoutingModule } from './location-routing.module';
import { LocationOverviewComponent, LocationFormComponent } from './containers/';


@NgModule({
  declarations: [
    LocationOverviewComponent,
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule
  ]
})
export class LocationModule { }
