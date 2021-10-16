import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { MaterialModule } from './material/material.module';
import { ButtonBarComponent } from './components/button-bar/button-bar.component';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { ColorDotComponent } from './components/color-dot/color-dot.component';
import { I18NextModule } from 'angular-i18next';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    I18NextModule,
    MaterialModule,
  ],
  declarations: [
    BottomSheetComponent,
    ButtonBarComponent,
    ColorDotComponent,
    ConfirmComponent,
    TimestampPipe,
  ],
  exports: [
    BottomSheetComponent,
    ButtonBarComponent,
    ColorDotComponent,
    ConfirmComponent,
    TimestampPipe,
  ]
})
export class SharedModule { }
