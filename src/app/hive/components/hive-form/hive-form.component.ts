import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Hive } from '../../models';

@Component({
  selector: 'bee-hive-form',
  templateUrl: './hive-form.component.html',
  styleUrls: [ './hive-form.component.css' ]
})
export class HiveFormComponent implements OnInit {

  @Input() set hive(hive: Hive | null | undefined) {
    if (hive) {
      const date = hive.date?.toDate();
      const values = { ...hive, date };
      this.form.patchValue(values);
    }
  }

  @Output() submitEvent = new EventEmitter<Hive>();
  @Output() cancelEvent = new EventEmitter<void>();

  readonly form = this.formBuilder.group({
    id: [ '' ],
    name: [ '', Validators.required ],
    active: [ true ],
    color: [],
    type: [],
    date: [ new Date(), Validators.required ],
    remarks: [ '' ]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  cancel(): void {
    this.cancelEvent.emit();
  }

  submit(): void {
    if (this.form.valid) {
      this.submitEvent.emit({ ...this.form.value });
    }
  }

}
