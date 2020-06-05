import { Component, OnInit } from '@angular/core';
import { QueenService } from '../../services/queen.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.name) {
      this.edit$ = this.queenService.findOne(this.route.snapshot.params.name);
    }
  }

  save(queen: Queen) {
    this.queenService.save(queen)
      .pipe(
        tap(() => this.router.navigate([this.edit$ ? '../..' : '..'], { relativeTo: this.route })),
        take(1)
      )
      .subscribe();
  }
}
