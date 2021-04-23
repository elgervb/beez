import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueenRoutingModule } from './queen-routing.module';
import { QueenComponent } from './containers/queen/queen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { QueenFormComponent } from './components/queen-form/queen-form.component';
import { QueenEditComponent } from './containers/queen-edit/queen-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    QueenComponent,
    QueenFormComponent,
    QueenEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    QueenRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class QueenModule { }
