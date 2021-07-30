import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { ColorDotComponent } from './color-dot/color-dot.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { I18NextModule } from 'angular-i18next';
import { MaterialModule } from './material.module';
import { QrDialogComponent } from './dialogs/qr-dialog/qr-dialog.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  declarations: [
    ButtonBarComponent,
    ColorDotComponent,
    ConfirmComponent,
    QrDialogComponent,
  ],
  exports: [
    ButtonBarComponent,
    ColorDotComponent,
    ConfirmComponent,
    QrDialogComponent,
  ],
  imports: [
    CommonModule,
    I18NextModule,
    MaterialModule,
    NgxQRCodeModule,
  ]
})
export class ComponentsModule { }
