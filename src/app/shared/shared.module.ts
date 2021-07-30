import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { MaterialModule } from './material/material.module';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { I18NextModule } from 'angular-i18next';

@NgModule({
  imports: [
    CommonModule,
    I18NextModule,
    MaterialModule,
  ],
  declarations: [
    ConfirmComponent,
    TimestampPipe,
  ],
  exports: [
    ConfirmComponent,
    TimestampPipe,
  ]
})
export class SharedModule { }
