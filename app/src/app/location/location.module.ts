import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LocationRoutingModule } from './location-routing.module';
import { LocationOverviewComponent, LocationEditComponent } from './containers/';
import { LocationFormComponent } from './components/location-form/location-form.component';


@NgModule({
  declarations: [
    LocationOverviewComponent,
    LocationEditComponent,
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule
  ]
})
export class LocationModule { }
