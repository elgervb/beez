import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LocationRoutingModule } from './location-routing.module';
import { LocationOverviewComponent, LocationEditComponent } from './containers/';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LocationOverviewComponent,
    LocationEditComponent,
    LocationFormComponent,
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LocationModule { }
