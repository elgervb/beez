import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HiveService } from '../../services/hive.service';
import { Hive } from '@common/hive';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hive',
  templateUrl: './hive-overview.component.html',
  styleUrls: ['./hive-overview.component.css']
})
export class HiveOverviewComponent implements OnInit {

  hives$: Observable<Hive[]>;

  constructor(
    private router: Router,
    private hiveService: HiveService
  ) { }

  ngOnInit(): void {
    this.hives$ = this.hiveService.findAll();
  }

  edit(hive: Hive) {
    this.router.navigateByUrl(this.router.url + '/edit/' + hive.name);
  }

  delete(location: Hive) {
    this.hives$ = this.hiveService.delete(location)
      .pipe(
        switchMap(() => this.hiveService.findAll()),
        take(1)
      );
  }

  trackHive(_: number, location: Hive) {
    return location.name;
  }
}
