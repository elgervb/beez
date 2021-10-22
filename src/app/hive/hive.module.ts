import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiveRoutingModule } from './hive-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule, MaterialModule } from 'components';
import { HiveDetailsComponent, HiveEditComponent, HiveListComponent } from './containers/';
import { HiveFormComponent, QrDialogComponent } from './components';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { I18NextModule } from 'angular-i18next';

@NgModule({
  declarations: [
    HiveEditComponent,
    HiveFormComponent,
    HiveListComponent,
    HiveDetailsComponent,
    QrDialogComponent,
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
