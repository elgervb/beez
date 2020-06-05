import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LocationRoutingModule } from './location-routing.module';
import { LocationOverviewComponent, LocationEditComponent } from './containers/';


@NgModule({
  declarations: [
    LocationOverviewComponent,
    LocationEditComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule
  ]
})
export class LocationModule { }
