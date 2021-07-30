import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'components';
import { TimestampPipe } from './pipes/timestamp.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    TimestampPipe,
  ],
  exports: [
    TimestampPipe,
  ]
})
export class SharedModule { }
