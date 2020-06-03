import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiveRoutingModule } from './hive-routing.module';
import { HiveComponent } from './containers/hives/hive.component';
import { HiveFormComponent } from './containers/hive-form/hive-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HiveComponent,
    HiveFormComponent
  ],
  imports: [
    CommonModule,
    HiveRoutingModule,
    ReactiveFormsModule
  ]
})
export class HiveModule { }
