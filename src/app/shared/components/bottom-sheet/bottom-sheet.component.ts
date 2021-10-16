import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Observable, Subject } from 'rxjs';

export interface SheetActions {
  readonly actions: SheetAction[];
}

export interface SheetAction {
  transKey: string;
  type: string;
}

@Component({
  selector: 'bee-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {

  action$: Observable<string>;

  get actions(): SheetAction[] {
    return this.data.actions;
  }

  private actionSubject = new Subject<string>();

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data: SheetActions) { }

  ngOnInit(): void {
    this.action$ = this.actionSubject.asObservable();
  }

  execute(action: string): void {
    this.actionSubject.next(action);
  }
}
