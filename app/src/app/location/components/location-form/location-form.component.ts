import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit, OnChanges {

  @Input() edit?: Location;
  @Output() submitEvent = new EventEmitter<Location>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
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
