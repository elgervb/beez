import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { ColorDotComponent } from './color-dot/color-dot.component';


@NgModule({
  declarations: [
    ButtonBarComponent,
    ColorDotComponent
  ],
  exports: [
    ButtonBarComponent,
    ColorDotComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
