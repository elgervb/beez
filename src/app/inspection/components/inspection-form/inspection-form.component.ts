import { Component, Input, OnInit } from '@angular/core';
import { Inspection } from '../../models';

@Component({
  selector: 'bee-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.css']
})
export class InspectionFormComponent implements OnInit {

  @Input() inspection: Inspection;

  constructor() { }

  ngOnInit(): void {
  }

}
