import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StencilDirective } from './formcontrol/stencil.directive';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConfirmComponent,
    StencilDirective
  ],
  exports: [
    ConfirmComponent,
    StencilDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
