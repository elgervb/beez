import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HiveFormComponent } from './components/hive-form/hive-form.component';
import { HiveEditComponent, HiveOverviewComponent } from './containers';
import { HiveRoutingModule } from './hive-routing.module';

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
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HiveModule { }
