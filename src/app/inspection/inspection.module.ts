import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';

import { InspectionRoutingModule } from './inspection-routing.module';
import { InspectionAddComponent, InspectionListComponent } from './containers';
import { InspectionDetailsComponent, InspectionFormComponent } from './components';
import { HoneyProgressPipe, QueenPresentColorPipe } from './pipes';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { TrendingIconNamePipe } from './pipes/trending-icon-name.pipe';

@NgModule({
  declarations: [
    InspectionListComponent,
    InspectionFormComponent,
    InspectionDetailsComponent,
    InspectionAddComponent,
    QueenPresentColorPipe,
    HoneyProgressPipe,
    TrendingIconNamePipe
  ],
  imports: [
    CommonModule,
    I18NextModule,
    InspectionRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class InspectionModule { }
