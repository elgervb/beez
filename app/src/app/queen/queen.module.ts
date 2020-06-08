import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueenRoutingModule } from './queen-routing.module';
import { QueenOverviewComponent, QueenEditComponent } from './containers';
import { ReactiveFormsModule } from '@angular/forms';
import { QueenFormComponent } from './components/queen-form/queen-form.component';
import { SharedModule } from '../shared/shared.module';


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
  ]
})
export class QueenModule { }
