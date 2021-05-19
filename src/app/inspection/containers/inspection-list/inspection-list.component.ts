import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bee-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit {

  @Input() hiveId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
