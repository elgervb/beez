import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueenRoutingModule } from './queen-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromQueen from './store/reducers/queen/queen.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QueenEffects } from './store/effects/queen/queen.effects';
import { QueenComponent } from './containers/queen/queen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { QueenFormComponent } from './components/queen-form/queen-form.component';
import { QueenEditComponent } from './containers/queen-edit/queen-edit.component';

@NgModule({
  declarations: [
    QueenComponent,
    QueenFormComponent,
    QueenEditComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([QueenEffects]),
    MaterialModule,
    QueenRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromQueen.queenFeatureKey, fromQueen.reducer),
  ]
})
export class QueenModule { }
