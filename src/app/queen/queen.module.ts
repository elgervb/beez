import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueenRoutingModule } from './queen-routing.module';
import { QueenDetailsComponent, QueenEditComponent, QueenListComponent } from './containers';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule, MaterialModule } from 'components';
import { QueenFormComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { I18NextModule } from 'angular-i18next';

@NgModule({
  declarations: [
    QueenListComponent,
    QueenFormComponent,
    QueenEditComponent,
    QueenDetailsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    I18NextModule,
    MaterialModule,
    QueenRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class QueenModule { }
