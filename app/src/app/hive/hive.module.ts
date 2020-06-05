import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiveRoutingModule } from './hive-routing.module';
import { HiveOverviewComponent, HiveEditComponent } from './containers';
import { ReactiveFormsModule } from '@angular/forms';
import { HiveFormComponent } from './components/hive-form/hive-form.component';


@NgModule({
  declarations: [
    HiveOverviewComponent,
    HiveEditComponent,
    HiveFormComponent
  ],
  imports: [
    CommonModule,
    HiveRoutingModule,
    ReactiveFormsModule
  ]
})
export class HiveModule { }
