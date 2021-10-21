import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { I18NextModule } from 'angular-i18next';
import { MaterialModule } from 'projects/components/src/public-api';


@NgModule({
  declarations: [ BottomSheetComponent ],
  exports: [ BottomSheetComponent ],
  imports: [ CommonModule, I18NextModule, MaterialModule ]
})
export class ComponentsModule { }
