import { Component, OnInit } from '@angular/core';
import { Location as NgLocation } from '@angular/common';
import { QueenService } from '../../services/queen.service';
import { ActivatedRoute } from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Queen } from '@common/queen';

@Component({
  selector: 'app-queen-edit',
  templateUrl: './queen-edit.component.html',
  styleUrls: ['./queen-edit.component.css']
})
export class QueenEditComponent implements OnInit {

  edit$?: Observable<Queen>;

  constructor(
    private queenService: QueenService,
    private history: NgLocation,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.name) {
      this.edit$ = this.queenService.findOne(this.route.snapshot.params.name);
    }
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
