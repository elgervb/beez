import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { I18NextModule } from 'angular-i18next';
import { MaterialModule } from '../material/material.module';
import { ColorDotComponent } from './color-dot/color-dot.component';
import { ButtonBarComponent, ConfirmComponent } from '.';


@NgModule({
  declarations: [ BottomSheetComponent, ButtonBarComponent, ColorDotComponent, ConfirmComponent ],
  exports: [ BottomSheetComponent, ButtonBarComponent, ColorDotComponent, ConfirmComponent ],
  imports: [ CommonModule, I18NextModule, MaterialModule ]
})
export class ComponentsModule { }
