import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { LocationFormComponent } from './components/location-form/location-form.component';
import { LocationEditComponent, LocationOverviewComponent } from './containers/';
import { LocationRoutingModule } from './location-routing.module';

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
