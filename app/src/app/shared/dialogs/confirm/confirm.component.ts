import { DialogRef, DIALOG_DATA } from '@angular/cdk-experimental/dialog';
import { Component, Inject, OnInit, Optional } from '@angular/core';

import { ConfirmData } from '../dialog.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    private dialog: DialogRef<ConfirmComponent>,
    @Optional() @Inject(DIALOG_DATA) public data?: ConfirmData
  ) { }

  ngOnInit(): void { }

  close(okBtn: boolean) {
    this.dialog.close(okBtn);
  }

}
