import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './containers/scanner/scanner.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [ ScannerComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    ScannerRoutingModule,
    SharedModule,
    ZXingScannerModule,
  ]
})
export class ScannerModule { }
