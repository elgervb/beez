import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Inspection } from '@common/inspection';

@Component({
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.css']
})
export class InspectionFormComponent implements OnInit, OnChanges {

  @Input() edit?: Inspection;

  @Output() readonly cancelEvent = new EventEmitter<void>();
  @Output() readonly submitEvent = new EventEmitter<Inspection>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [],
      date: [this.toDateInputString(new Date()), Validators.required],
      hiveId: [this.route.snapshot.params.hiveId, Validators.required],
      queenPresent: [false],
      queenSeen: [false],
      eggs: [false],
      brias: [false],
      remarks: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.edit && changes.edit.currentValue) {

      this.form.patchValue(
        { ...changes.edit.currentValue, date: this.toDateInputString(new Date(changes.edit.currentValue.date)) }
      );
    }
  }

  submit() {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    }
  }

  private toDateInputString(date: Date) {
    const minInMilli = 60000;

    // because we need to call the toISOString, we need to do a timezone correction manually
    const tzoffset = (new Date()).getTimezoneOffset() * minInMilli;
    const roundedWithTimezone = new Date(date.getTime() - tzoffset);
    // and don't show the (milli)seconds
    roundedWithTimezone.setSeconds(0, 0);

    return roundedWithTimezone.toISOString().slice(0, -1);
  }
}
