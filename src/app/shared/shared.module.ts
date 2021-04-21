import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { MaterialModule } from './material/material.module';
import { ButtonBarComponent } from './components/button-bar/button-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    ConfirmComponent,
    ButtonBarComponent,
  ],
  exports: [
    ButtonBarComponent,
    ConfirmComponent,
  ]
})
export class SharedModule { }
