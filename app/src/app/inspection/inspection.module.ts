import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { InspectionFormComponent } from './components/inspection-form/inspection-form.component';
import { InspectionEditComponent } from './containers/inspection-edit/inspection-edit.component';
import { InspectionOverviewComponent } from './containers/inspection-overview/inspection-overview.component';
import { InspectionRoutingModule } from './inspection-routing.module';

@NgModule({
  declarations: [
    InspectionFormComponent,
    InspectionEditComponent,
    InspectionOverviewComponent
  ],
  imports: [
    CommonModule,
    InspectionRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class InspectionModule { }
