import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { getParam } from 'src/app/shared/utils/route/get-param';
import { Inspection } from '../../models';
import { InspectionService } from '../../services/inspection.service';

@Component({
  selector: 'bee-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit {

  inspections$: Observable<Inspection[]>;

  constructor(
    public route: ActivatedRoute,
    private inspectionService: InspectionService
  ) { }

  ngOnInit(): void {
    const hiveId = getParam(this.route.snapshot.root, 'hiveId');
    if (hiveId) {
      this.inspections$ = this.inspectionService.getInspections(hiveId, 5).pipe(share());
    }
  }

  queenPresentColor(inspection: Inspection): string {
    return inspection.queen || inspection.eggs ? 'green' : 'red';
  }

  honeyString(inspection: Inspection): string {
    return inspection.honey && inspection.honeyClosed ? `${inspection.honey} / ${inspection.honeyClosed}` : 'n/a';
  }

  trendingIconName(inspection: Inspection, inspectionList?: Inspection[]): string {
    const index = inspectionList?.indexOf(inspection);
    const isLastInspection = index && index + 1 === inspectionList?.length;

    if (inspectionList && index !== undefined && index !== -1 && !isLastInspection) {
      const compareTo = inspectionList[index + 1];

      if (compareTo) {
        const health1 = inspection.health;
        const health2 = compareTo.health;
        return health1 > health2 ? 'trending_up' : health1 < health2 ? 'trending_down' : 'compare_arrows';
      }
    }

    return 'compare_arrows';
  }

}
