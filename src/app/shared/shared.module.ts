import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { MaterialModule } from './material/material.module';
import { ButtonBarComponent } from './components/button-bar/button-bar.component';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { ColorDotComponent } from './components/color-dot/color-dot.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    ButtonBarComponent,
    ColorDotComponent,
    ConfirmComponent,
    TimestampPipe,
  ],
  exports: [
    ButtonBarComponent,
    ColorDotComponent,
    ConfirmComponent,
    TimestampPipe,
  ]
})
export class SharedModule { }
