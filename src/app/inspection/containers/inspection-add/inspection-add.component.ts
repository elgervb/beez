import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { Inspection } from '../../models';
import { InspectionService } from '../../services/inspection.service';

@Component({
  selector: 'bee-inspection-add',
  templateUrl: './inspection-add.component.html',
  styleUrls: ['./inspection-add.component.css']
})
export class InspectionAddComponent implements OnInit {

  timestamp = new FormControl({ value: new Date(), disabled: true }, Validators.required);

  honeySuperGroup = this.formBuilder.group({
    honey: [null],
    honeyClosed: [null]
  });

  hiveBodyGroup = this.formBuilder.group({
    drones: [null],
    queen: [null],
    eggs: [null],
    larva: [null],
    closedBrood: [null],
    droneBrood: [null],
    queenBrood: [null],
    honeyFood: [null],
  });

  overallGroup = this.formBuilder.group({
    health: [null, Validators.required],
    remarks: [null]
  });

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private inspectionService: InspectionService,
  ) { }

  ngOnInit(): void { }

  formatLabel(value: number): string {
    return value ? value + '%' : '';
  }

  submit(): void {
    const inspection: Inspection = {
      date: this.timestamp.value,
      ...this.honeySuperGroup.value,
      ...this.hiveBodyGroup.value,
      ...this.overallGroup.value
    };

    const hiveId = this.route.snapshot.paramMap.get('hiveId');

    if (hiveId) {
      this.inspectionService.add(inspection, hiveId)
        .pipe(
          take(1),
          tap(() => this.location.back())
        ).subscribe();
    }
  }
}



