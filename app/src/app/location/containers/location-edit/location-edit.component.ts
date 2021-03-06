import { Location as NgLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@common/location';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  edit$?: Observable<Location>;

  constructor(
    private locationService: LocationService,
    private history: NgLocation,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.name) {
      this.edit$ = this.locationService.findOne(this.route.snapshot.params.name);
    }
  }

  goBack() {
    this.history.back();
  }

  save(location: Location) {
    this.locationService.save(location)
      .pipe(
        tap(() => this.goBack()),
        take(1)
      )
      .subscribe();
  }

}
