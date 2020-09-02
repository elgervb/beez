import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inspection } from '@common/inspection';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { InspectionService } from '../../services/inspecton.service';

@Component({
  selector: 'app-inspection-edit',
  templateUrl: './inspection-edit.component.html',
  styleUrls: ['./inspection-edit.component.css']
})
export class InspectionEditComponent implements OnInit {

  edit$?: Observable<Inspection>;

  constructor(
    private inspectionService: InspectionService,
    private history: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const { hiveId, inspectionId } = this.route.snapshot.params;
    if (inspectionId) {
      this.edit$ = this.inspectionService.findOne(hiveId, inspectionId);
    }
  }

  goBack() {
    this.history.back();
  }

  save(inspection: Inspection) {
    this.inspectionService.save(inspection)
      .pipe(
        tap(() => this.goBack()),
        take(1)
      )
      .subscribe();
  }

}
