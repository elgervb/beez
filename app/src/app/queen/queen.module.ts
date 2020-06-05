import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueenRoutingModule } from './queen-routing.module';
import { QueenOverviewComponent, QueenEditComponent } from './containers';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QueenOverviewComponent,
    QueenEditComponent
  ],
  imports: [
    CommonModule,
    QueenRoutingModule,
    ReactiveFormsModule
  ]
})
export class QueenModule { }
