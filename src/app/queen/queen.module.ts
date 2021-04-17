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

@NgModule({
  declarations: [
    QueenComponent
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
