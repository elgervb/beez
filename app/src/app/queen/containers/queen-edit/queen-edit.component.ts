import { Location as NgLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Queen } from '@common/queen';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { QueenService } from '../../services/queen.service';

@Component({
  selector: 'app-queen-edit',
  templateUrl: './queen-edit.component.html',
  styleUrls: ['./queen-edit.component.css']
})
export class QueenEditComponent implements OnInit {

  edit$?: Observable<Queen>;
  parents$: Observable<Queen[]>;

  constructor(
    private queenService: QueenService,
    private history: NgLocation,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.name) {
      this.edit$ = this.queenService.findOne(this.route.snapshot.params.name);
    }

    this.parents$ = this.queenService.findAll();
  }

  goBack() {
    this.history.back();
  }

  save(queen: Queen) {
    this.queenService.save(queen)
      .pipe(
        tap(() => this.goBack()),
        take(1)
      )
      .subscribe();
  }
}
