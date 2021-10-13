import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum HiveAction {
  deleteHive,
  navigateToEdit,
  printQRCode
}

@Component({
  selector: 'bee-hive-actions',
  templateUrl: './hive-actions.component.html',
  styleUrls: ['./hive-actions.component.css']
})
export class HiveActionsComponent implements OnInit {

  action$: Observable<HiveAction>;

  private actionSubject = new Subject<HiveAction>();

  constructor() { }

  ngOnInit(): void {
    this.action$ = this.actionSubject.asObservable();
  }

  deleteHive(): void {
    this.actionSubject.next(HiveAction.deleteHive);
  }

  navigateToEdit(): void {
    this.actionSubject.next(HiveAction.navigateToEdit);
  }

  printQRCode(): void {
    this.actionSubject.next(HiveAction.printQRCode);
  }
}
