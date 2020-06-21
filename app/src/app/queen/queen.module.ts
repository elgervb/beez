import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { QueenFormComponent } from './components/queen-form/queen-form.component';
import { QueenEditComponent, QueenOverviewComponent } from './containers';
import { QueenRoutingModule } from './queen-routing.module';

@NgModule({
  declarations: [
    QueenOverviewComponent,
    QueenEditComponent,
    QueenFormComponent
  ],
  imports: [
    CommonModule,
    QueenRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QueenModule { }
