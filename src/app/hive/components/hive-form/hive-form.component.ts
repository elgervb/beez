import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Hive } from '../../models';

@Component({
  selector: 'bee-hive-form',
  templateUrl: './hive-form.component.html',
  styleUrls: [ './hive-form.component.css' ]
})
export class HiveFormComponent {

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

  @Input() set hive(hive: Hive | null | undefined) {
    if (hive) {
      const date = hive.date?.toDate();
      const values = { ...hive, date };
      this.form.patchValue(values);
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  cancel(): void {
    this.cancelEvent.emit();
  }

  submit(): void {
    if (this.form.valid) {
      this.submitEvent.emit({ ...this.form.value });
    }
  }

}
