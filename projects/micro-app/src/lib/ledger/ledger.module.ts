import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LegderComponent } from './containers/legder/legder.component';
import { ComponentsModule, MaterialModule } from 'components';
import { LedgerEntryFormComponent } from './components/ledger-entry-form/ledger-entry-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { SumPipe } from './pipes/sum.pipe';

@NgModule({
  declarations: [ LegderComponent, LedgerEntryFormComponent, EntryListComponent, SumPipe ],
  imports: [
    CommonModule,
    ComponentsModule,
    I18NextModule,
    LedgerRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class LedgerModule { }
