import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiveRoutingModule } from './hive-routing.module';
import { HiveOverviewComponent, HiveFormComponent } from './containers';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HiveOverviewComponent,
    HiveFormComponent
  ],
  imports: [
    CommonModule,
    HiveRoutingModule,
    ReactiveFormsModule
  ]
})
export class HiveModule { }
