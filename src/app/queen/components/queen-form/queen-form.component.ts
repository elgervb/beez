import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Queen } from '../../models';

@Component({
  selector: 'bee-queen-form',
  templateUrl: './queen-form.component.html',
  styleUrls: [ './queen-form.component.css' ]
})
export class QueenFormComponent {

  @Output() submitEvent = new EventEmitter<Queen>();
  @Output() cancelEvent = new EventEmitter<void>();

  readonly form = this.formBuilder.group({
    id: [ '' ],
    name: [ '', Validators.required ],
    active: [ true ],
    isMarked: [ false ],
    color: [ '' ],
    date: [ new Date(), Validators.required ],
    remarks: [ '' ]
  });

  @Input() set queen(queen: Queen | null | undefined) {
    if (queen) {
      const date = queen.date?.toDate();
      const values = { ...queen, date };
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
