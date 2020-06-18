import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSelectComponent } from './color-select/color-select.component';
import { StencilDirective } from './formcontrol/stencil.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ColorSelectComponent, StencilDirective],
  exports: [ColorSelectComponent, StencilDirective]
})
export class SharedModule { }
