import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data$: Observable<Data>;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.data$ = merge(
      this.route.firstChild ? this.route.firstChild.data : this.route.data,
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(() => this.route.firstChild ? this.route.firstChild.data : this.route.data),
      )
    );

  }

}
