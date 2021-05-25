import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionRoutingModule } from './inspection-routing.module';
import { InspectionListComponent } from './containers';
import { InspectionDetailsComponent, InspectionFormComponent } from './components';
import { InspectionAddComponent } from './containers/inspection-add/inspection-add.component';

@NgModule({
  declarations: [
    InspectionListComponent,
    InspectionFormComponent,
    InspectionDetailsComponent,
    InspectionAddComponent
  ],
  imports: [
    CommonModule,
    InspectionRoutingModule
  ]
})
export class InspectionModule { }
