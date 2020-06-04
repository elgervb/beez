import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueenRoutingModule } from './queen-routing.module';
import { QueenComponent } from './containers/queen/queen.component';
import { QueenFormComponent } from './containers/queen-form/queen-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [QueenComponent, QueenFormComponent],
  imports: [
    CommonModule,
    QueenRoutingModule,
    ReactiveFormsModule
  ]
})
export class QueenModule { }
