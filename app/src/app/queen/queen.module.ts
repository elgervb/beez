import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueenRoutingModule } from './queen-routing.module';
import { QueenOverviewComponent, QueenFormComponent } from './containers';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QueenOverviewComponent,
    QueenFormComponent
  ],
  imports: [
    CommonModule,
    QueenRoutingModule,
    ReactiveFormsModule
  ]
})
export class QueenModule { }
