import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionRoutingModule } from './inspection-routing.module';
import { InspectionListComponent } from './containers';
import { InspectionDetailsComponent, InspectionFormComponent } from './components';
import { InspectionAddComponent } from './containers/inspection-add/inspection-add.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InspectionListComponent,
    InspectionFormComponent,
    InspectionDetailsComponent,
    InspectionAddComponent
  ],
  imports: [
    CommonModule,
    InspectionRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class InspectionModule { }
