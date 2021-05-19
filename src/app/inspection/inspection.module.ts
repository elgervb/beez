import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionRoutingModule } from './inspection-routing.module';
import { InspectionListComponent } from './containers';
import { InspectionDetailsComponent, InspectionFormComponent } from './components';

@NgModule({
  declarations: [
    InspectionListComponent,
    InspectionFormComponent,
    InspectionDetailsComponent
  ],
  imports: [
    CommonModule,
    InspectionRoutingModule
  ]
})
export class InspectionModule { }
