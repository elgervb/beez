import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Queen } from '../../models';

@Component({
  selector: 'app-queen-form',
  templateUrl: './queen-form.component.html',
  styleUrls: ['./queen-form.component.css']
})
export class QueenFormComponent implements OnInit {

  @Input() set queen(queen: Queen | null | undefined) {
    if (queen) {
      this.form.patchValue(queen);
    }
  }

  @Output() submitEvent = new EventEmitter<Queen>();
  @Output() cancelEvent = new EventEmitter<void>();

  readonly form = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  cancel(): void {
    this.cancelEvent.emit();
  }

  submit(): void {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    }
  }

}