import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginModel } from '../../login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  @Output() readonly submitEvent = new EventEmitter<LoginModel>();
  @Output() readonly cancelEvent = new EventEmitter<void>();

  constructor(
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  cancel() {
    this.cancelEvent.emit();
  }

  submit() {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    }
  }

}
