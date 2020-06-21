import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { StencilDirective } from './formcontrol/stencil.directive';

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
