import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueenRoutingModule } from './queen-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromQueen from './store/reducers/queen/queen.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QueenEffects } from './store/effects/queen/queen.effects';
import { QueenComponent } from './containers/queen/queen.component';

@NgModule({
  declarations: [
    QueenComponent
  ],
  imports: [
    CommonModule,
    QueenRoutingModule,
    StoreModule.forFeature(fromQueen.queenFeatureKey, fromQueen.reducer),
    EffectsModule.forFeature([QueenEffects])
  ]
})
export class QueenModule { }
