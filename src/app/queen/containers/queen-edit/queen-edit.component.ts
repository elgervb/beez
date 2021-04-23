import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Queen } from '../../models';
import { QueenService } from '../../services/queen.service';

@Component({
  selector: 'app-queen-edit',
  templateUrl: './queen-edit.component.html',
  styleUrls: ['./queen-edit.component.css']
})
export class QueenEditComponent implements OnInit, OnDestroy {

  queen$?: Observable<Queen | undefined>;

  get isEdit(): boolean {
    return !!this.queenId;
  }

  get queenId(): string | null {
    return this.route.snapshot.paramMap.get('queenId');
  }

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private queenService: QueenService
  ) { }

  ngOnInit(): void {
    const queenId = this.queenId;
    if (queenId) {
      this.queen$ = this.queenService.getQueen(queenId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  edit(queen: Queen): void {
    const result: Observable<DocumentReference<Queen> | Queen | undefined> =
      !!queen.id ? this.queenService.updateQueen(queen) : this.queenService.createQueen(queen);

    result.pipe(
      first(),
      tap(() => this.cancel())
    ).subscribe();
  }

  cancel(): void {
    const path = this.isEdit ? '../..' : '..';
    this.router.navigate([path], { relativeTo: this.route });
  }

}