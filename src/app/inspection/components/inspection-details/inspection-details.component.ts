import { Component, Input } from '@angular/core';
import { Inspection } from '../../models';

@Component({
  selector: 'bee-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: [ './inspection-details.component.css' ]
})
export class InspectionDetailsComponent {

  @Input() inspection: Inspection;

}
