import { Component, OnInit, Inject, Optional } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk-experimental/dialog';
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
