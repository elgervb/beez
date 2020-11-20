import { Component, OnInit } from '@angular/core';
import { DashboardOverview } from '@common/dashboard-overview';
import { Observable } from 'rxjs';

import { OverviewService } from '../../services/overview.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {

  overview$: Observable<DashboardOverview>;
  constructor(private overviewService: OverviewService) { }

  ngOnInit() {
    this.overview$ = this.overviewService.find();
  }

}
