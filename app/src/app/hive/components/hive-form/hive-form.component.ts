import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hive } from '@common/hive';
import { Location } from '@common/location';

@Component({
  selector: 'app-hive-form',
  templateUrl: './hive-form.component.html',
  styleUrls: ['./hive-form.component.css']
})
export class HiveFormComponent implements OnInit, OnChanges {

  @Input() locations: Location[];
  @Input() edit?: Hive;

  @Output() readonly cancelEvent = new EventEmitter<void>();
  @Output() readonly submitEvent = new EventEmitter<Location>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      number: ['', Validators.required],
      type: [''],
      location: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.edit && changes.edit.currentValue) {
      this.form.patchValue(
        changes.edit.currentValue
      );
    }
  }

  compareLocations(l1: Location, l2: Location) {
    return l1 && l2 ? l1.name === l2.name : l1 === l2;
  }

  submit() {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    }
  }

  trackLocation(_: number, location: Location) {
    return location.name;
  }
}
