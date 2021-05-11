import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiveRoutingModule } from './hive-routing.module';
import { HiveListComponent, HiveEditComponent } from './containers/';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { HiveFormComponent } from './components';
import { HiveDetailsComponent } from './containers/hive-details/hive-details.component';

@NgModule({
  declarations: [
    HiveEditComponent,
    HiveFormComponent,
    HiveListComponent,
    HiveDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HiveRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class HiveModule { }
