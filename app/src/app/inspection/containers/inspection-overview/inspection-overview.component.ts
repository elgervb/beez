import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inspection } from '@common/inspection';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';

import { InspectionService } from '../../services/inspecton.service';

@Component({
  selector: 'app-inspection-overview',
  templateUrl: './inspection-overview.component.html',
  styleUrls: ['./inspection-overview.component.css']
})
export class InspectionOverviewComponent implements OnInit {

  inspections$: Observable<Inspection[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private inspectionService: InspectionService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.inspections$ = this.inspectionService.findAll(this.route.snapshot.params.hiveId);
  }

  edit(inspection: Inspection) {
    this.router.navigateByUrl(`${this.router.url}/edit/${inspection.id}`);
  }

  cancelEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  delete(inspection: Inspection) {
    const dialogRef = this.dialogService.confirm(
      {
        title: 'Delete inspection',
        message: `Are you sure you want to delete inspection on ${inspection.date}?`
      }
    );

    dialogRef.afterClosed()
      .pipe(
        filter(data => data),
        tap(() => this.inspections$ = this.inspectionService.delete(inspection)
          .pipe(
            switchMap(() => this.inspectionService.findAll(this.route.snapshot.params.hiveId))
          )
        ),
        take(1)
      ).subscribe();
  }

  gotoHive(_: string) {
    this.router.navigate([`/hive`]);
  }

  trackInspection(inspection: Inspection) {
    return inspection.id;
  }

}
