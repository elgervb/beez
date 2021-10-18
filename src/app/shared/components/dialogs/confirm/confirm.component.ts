import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  content?: string;
}

@Component({
  selector: 'bee-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: [ './confirm.component.css' ]
})
export class ConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

  ngOnInit(): void {

  }

}
