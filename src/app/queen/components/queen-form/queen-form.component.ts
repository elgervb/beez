import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Queen } from '../../models';

@Component({
  selector: 'app-queen-form',
  templateUrl: './queen-form.component.html',
  styleUrls: ['./queen-form.component.css']
})
export class QueenFormComponent implements OnInit {

  @Output() submitEvent = new EventEmitter<Queen>();

  readonly form = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  submit(): void {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    }
  }

}
