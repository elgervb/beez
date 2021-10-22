import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'components';
import { I18NextModule } from 'angular-i18next';

@NgModule({
  imports: [
    CommonModule,
    I18NextModule,
    MaterialModule,
  ]
})
export class SharedModule { }
