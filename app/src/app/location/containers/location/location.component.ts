import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Location } from '@common/location';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locations$: Observable<Location[]>;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locations$ = this.locationService.findAll();
  }

  delete(location: Location) {
    this.locations$ = this.locationService.delete(location)
      .pipe(
        switchMap(() => this.locationService.findAll()),
        take(1)
      );
  }

  showInGoogleMaps(location: Location) {
    window.open(`https://www.google.com/maps/@${location.long},${location.lat},16z`, '_blank');
  }

  trackLocation(_: number, location: Location) {
    return location.name;
  }

}
