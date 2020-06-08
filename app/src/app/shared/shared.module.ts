import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSelectComponent } from './color-select/color-select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ColorSelectComponent],
  exports: [ColorSelectComponent]
})
export class SharedModule { }
