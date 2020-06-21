import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit, OnChanges {

  @Input() edit?: Location;

  @Output() readonly cancelEvent = new EventEmitter<void>();
  @Output() readonly submitEvent = new EventEmitter<Location>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      lat: [''],
      long: ['']
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
