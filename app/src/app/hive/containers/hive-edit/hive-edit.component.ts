import { Component, OnInit } from '@angular/core';
import { Location as NgLocation } from '@angular/common';
import { HiveService } from '../../services/hive.service';
import { ActivatedRoute } from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { Location } from '@common/location';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/location/services/location.service';
import { Hive } from '@common/hive';

@Component({
  selector: 'app-hive-edit',
  templateUrl: './hive-edit.component.html',
  styleUrls: ['./hive-edit.component.css']
})
export class HiveEditComponent implements OnInit {

  locations$: Observable<Location[]>;
  edit$?: Observable<Hive>;

  constructor(
    private hiveService: HiveService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private history: NgLocation
  ) { }

  ngOnInit(): void {
    this.locations$ = this.locationService.findAll();

    const name = this.route.snapshot.params.name;
    const nr = this.route.snapshot.params.number;
    if (name && nr) {
      this.edit$ = this.hiveService.findOne(name, nr);
    }
  }

  goBack() {
    this.history.back();
  }

  save(hive: Hive) {
    this.hiveService.save(hive)
      .pipe(
        tap(() => this.goBack()),
        take(1)
      )
      .subscribe();
  }
}
