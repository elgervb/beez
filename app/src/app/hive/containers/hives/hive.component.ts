import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HiveService } from '../../services/hive.service';
import { Hive } from '@common/hive';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-hive',
  templateUrl: './hive.component.html',
  styleUrls: ['./hive.component.css']
})
export class HiveComponent implements OnInit {

  hives$: Observable<Hive[]>;

  constructor(private hiveService: HiveService) { }

  ngOnInit(): void {
    this.hives$ = this.hiveService.findAll();
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
