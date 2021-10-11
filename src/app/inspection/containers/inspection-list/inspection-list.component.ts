import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Inspection } from '../../models';
import { InspectionService } from '../../services/inspection.service';

@Component({
  selector: 'bee-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit {

  inspections$: Observable<Inspection[]>;
  selected?: Inspection;

  constructor(
    public route: ActivatedRoute,
    private inspectionService: InspectionService
  ) { }

  ngOnInit(): void {
    const hiveId = this.route.snapshot.paramMap.get('hiveId');
    if (hiveId) {
      this.inspections$ = this.inspectionService.getInspections(hiveId, 5).pipe(share());
    }
  }

  select(inspection: Inspection) {
    this.selected = this.selected === inspection ? undefined : inspection;
  }

}
