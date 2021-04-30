import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiveRoutingModule } from './hive-routing.module';
import { HiveComponent } from './containers/hive/hive.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { HiveFormComponent } from './components/hive-form/hive-form.component';
import { HiveEditComponent } from './containers/hive-edit/hive-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HiveComponent,
    HiveFormComponent,
    HiveEditComponent
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
