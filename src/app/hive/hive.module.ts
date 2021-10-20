import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiveRoutingModule } from './hive-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule, MaterialModule } from 'components';
import { HiveFormComponent } from './components';
import { HiveDetailsComponent, HiveEditComponent, HiveListComponent } from './containers/';
import { I18NextModule } from 'angular-i18next';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [
    HiveEditComponent,
    HiveFormComponent,
    HiveListComponent,
    HiveDetailsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    HiveRoutingModule,
    I18NextModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class HiveModule { }
