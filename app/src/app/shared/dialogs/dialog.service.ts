import { Injectable } from '@angular/core';
import { ConfirmComponent } from './confirm/confirm.component';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk-experimental/dialog';

const defaultOptions: DialogConfig = {
  disableClose: false,
  hasBackdrop: true,
  maxHeight: '100vh',
  maxWidth: '100%',
  position: { top: '10vh' },
};

export interface ConfirmData {
  title?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: Dialog
  ) { }

  confirm(data: ConfirmData): DialogRef<ConfirmComponent, boolean> {
    const dialogRef = this.dialog.openFromComponent(ConfirmComponent, {
      ...defaultOptions,
      disableClose: true,
      data
    });


    return dialogRef;
  }
}
