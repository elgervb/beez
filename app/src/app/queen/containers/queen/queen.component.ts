import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Queen } from '@common/queen';
import { QueenService } from '../../services/queen.service';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.css']
})
export class QueenComponent implements OnInit {

  queens$: Observable<Queen[]>;

  constructor(private queenService: QueenService) { }

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

  trackQueen(_: number, queen: Queen) {
    return queen.name;
  }

}
