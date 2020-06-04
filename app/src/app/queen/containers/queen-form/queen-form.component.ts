import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QueenService } from '../../services/queen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-queen-form',
  templateUrl: './queen-form.component.html',
  styleUrls: ['./queen-form.component.css']
})
export class QueenFormComponent implements OnInit {

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
