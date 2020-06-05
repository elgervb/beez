import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Queen } from '@common/queen';

@Component({
  selector: 'app-queen-form',
  templateUrl: './queen-form.component.html',
  styleUrls: ['./queen-form.component.css']
})
export class QueenFormComponent implements OnInit, OnChanges {

  @Input() edit?: Queen;

  @Output() submitEvent = new EventEmitter<Queen>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      color: [''],
      year: [''],
      active: [true, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.edit && changes.edit.currentValue) {
      this.form.patchValue(this.edit);
    }
  }

  save() {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    }
  }

}
