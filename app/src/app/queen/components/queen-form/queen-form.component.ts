import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Queen } from '@common/queen';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { queenColor, queenColors } from 'src/app/utils/queen-color';

@Component({
  selector: 'app-queen-form',
  templateUrl: './queen-form.component.html',
  styleUrls: ['./queen-form.component.css']
})
export class QueenFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() edit?: Queen;
  @Input() parents: Queen[];

  @Output() readonly cancelEvent = new EventEmitter<void>();
  @Output() readonly submitEvent = new EventEmitter<Queen>();

  form: FormGroup;
  colors = queenColors;
  currentYear = new Date().getFullYear();

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      color: [queenColor(this.currentYear)],
      year: [this.currentYear, [Validators.min(this.currentYear - 10), Validators.max(this.currentYear)]],
      active: [true, Validators.required],
      wingsCut: [false],
      mother: [''],
      race: [''],
      bought: [false],
      boughtFrom: [''],
      remarks: ['']
    });

    this.form.get('year').valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((year: number) => this.form.get('color').setValue(queenColor(year))),
        takeUntil(this.destroy$)
      ).subscribe();

    this.form.get('mother').valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((queen: Queen) => this.form.get('race').setValue(queen.race)),
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

  compareQueens(q1: Queen, q2: Queen) {
    return q1 && q2 ? q1.name === q2.name : q1 === q2;
  }

  trackQueen(queen: Queen) {
    return queen.name;
  }

  save() {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    }
  }

}
