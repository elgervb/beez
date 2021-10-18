import { Component, Input, OnInit } from '@angular/core';
import { Inspection } from '../../models';

@Component({
  selector: 'bee-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: [ './inspection-details.component.css' ]
})
export class InspectionDetailsComponent implements OnInit {

  @Input() inspection: Inspection;

  constructor() { }

  ngOnInit(): void { }

}
