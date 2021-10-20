import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';

import { InspectionRoutingModule } from './inspection-routing.module';
import { InspectionAddComponent, InspectionListComponent } from './containers';
import { InspectionDetailsComponent, InspectionFormComponent } from './components';
import { ComponentsModule, MaterialModule } from 'components';
import { SharedModule } from '../shared/shared.module';
import { HoneyProgressPipe, QueenPresentColorPipe } from './pipes';
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
    ComponentsModule,
    I18NextModule,
    InspectionRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class InspectionModule { }
