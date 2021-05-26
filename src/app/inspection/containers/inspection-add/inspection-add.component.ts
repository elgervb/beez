import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Inspection } from '../../models';
import { InspectionService } from '../../services/inspection.service';

@Component({
  selector: 'bee-inspection-add',
  templateUrl: './inspection-add.component.html',
  styleUrls: ['./inspection-add.component.css']
})
export class InspectionAddComponent implements OnInit {

  timestamp = Date.now();

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
    queenBrood: [null]
  });

  overallGroup = this.formBuilder.group({
    health: [null, Validators.required],
    remarks: [null]
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private inspectionService: InspectionService
  ) { }

  ngOnInit(): void {

  }

  formatLabel(value: number): string {
    return value + '%';
  }

  submit(): void {
    const inspection: Inspection = {
      ...this.honeySuperGroup.value,
      ...this.hiveBodyGroup.value,
      ...this.overallGroup.value
    };

    const hiveId = getParam(this.route.snapshot.root, 'hiveId');

    if (hiveId) {
      this.inspectionService.add(inspection, hiveId);
    }
  }
}

export const getParam = (route: ActivatedRouteSnapshot, param: string): string | null =>
  route.children.reduce<string | null>((acc: string | null, child: ActivatedRouteSnapshot) =>
    acc ? acc : child.paramMap.has(param) ? child.paramMap.get(param) : getParam(child, param)
    , null);

