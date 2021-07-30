import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionRoutingModule } from './inspection-routing.module';
import { InspectionListComponent } from './containers';
import { InspectionDetailsComponent, InspectionFormComponent } from './components';
import { InspectionAddComponent } from './containers/inspection-add/inspection-add.component';
import { MaterialModule } from 'components';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { I18NextModule } from 'angular-i18next';
import { ComponentsModule } from 'components';

@NgModule({
  declarations: [
    InspectionListComponent,
    InspectionFormComponent,
    InspectionDetailsComponent,
    InspectionAddComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    I18NextModule,
    InspectionRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class InspectionModule { }
