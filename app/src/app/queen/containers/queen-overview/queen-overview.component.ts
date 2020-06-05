import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Queen } from '@common/queen';
import { QueenService } from '../../services/queen.service';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queen',
  templateUrl: './queen-overview.component.html',
  styleUrls: ['./queen-overview.component.css']
})
export class QueenOverviewComponent implements OnInit {

  queens$: Observable<Queen[]>;

  constructor(
    private router: Router,
    private queenService: QueenService
  ) { }

  ngOnInit(): void {
    this.queens$ = this.queenService.findAll();
  }

  delete(queen: Queen) {
    this.queens$ = this.queenService.delete(queen)
      .pipe(
        switchMap(() => this.queenService.findAll()),
        take(1)
      );
  }

  edit(queen: Queen) {
    this.router.navigateByUrl(this.router.url + '/edit/' + queen.name);
  }

  trackQueen(_: number, queen: Queen) {
    return queen.name;
  }

}
