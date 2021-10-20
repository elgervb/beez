import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LegderComponent } from './containers/legder/legder.component';

@NgModule({
  declarations: [ LegderComponent ],
  imports: [
    CommonModule,
    LedgerRoutingModule
  ]
})
export class LedgerModule { }
