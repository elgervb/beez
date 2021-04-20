import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Queen } from '../../models';
import * as fromQueens from '../../store/';

@Component({
  selector: 'app-queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.css']
})
export class QueenComponent implements OnInit {

  queens$: Observable<Queen[]>;

  displayedColumns: string[] = ['name'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.queens$ = this.store.select(fromQueens.selectQueens);

    this.store.dispatch(fromQueens.loadQueens());
  }

  addQueen(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}
