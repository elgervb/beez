import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QueenService } from '../../services/queen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-queen-edit',
  templateUrl: './queen-edit.component.html',
  styleUrls: ['./queen-edit.component.css']
})
export class QueenEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private queenService: QueenService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      color: [''],
      year: [''],
      active: [true, Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      this.queenService.save(this.form.value)
        .pipe(
          tap(() => this.router.navigate(['..'], { relativeTo: this.route })),
          take(1)
        )
        .subscribe();
    }
  }
}
