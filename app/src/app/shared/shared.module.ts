import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSelectComponent } from './color-select/color-select.component';
import { StencilDirective } from './formcontrol/stencil.directive';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ColorSelectComponent,
    ConfirmComponent,
    StencilDirective
  ],
  exports: [
    ColorSelectComponent,
    ConfirmComponent,
    StencilDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
