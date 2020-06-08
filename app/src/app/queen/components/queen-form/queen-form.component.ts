import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Queen } from '@common/queen';
import { queenColors, queenColor } from 'src/app/utils/queen-color';
import { distinctUntilChanged, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-queen-form',
  templateUrl: './queen-form.component.html',
  styleUrls: ['./queen-form.component.css']
})
export class QueenFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() edit?: Queen;

  @Output() submitEvent = new EventEmitter<Queen>();

  form: FormGroup;
  colors = queenColors;
  currentYear = new Date().getFullYear();

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      color: [queenColor(this.currentYear)],
      year: [this.currentYear, [Validators.min(this.currentYear - 10), Validators.max(this.currentYear)]],
      active: [true, Validators.required]
    });

    this.form.get('year').valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((year: number) => this.form.get('color').setValue(queenColor(year))),
        takeUntil(this.destroy$)
      ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.edit && changes.edit.currentValue) {
      this.form.patchValue(this.edit);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save() {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    }
  }

}
