import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Location } from '@common/location';
import { Observable } from 'rxjs';
import { switchMap, take, filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';

@Component({
  selector: 'app-location-overview',
  templateUrl: './location-overview.component.html',
  styleUrls: ['./location-overview.component.css']
})
export class LocationOverviewComponent implements OnInit {

  locations$: Observable<Location[]>;

  constructor(
    private router: Router,
    private locationService: LocationService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.locations$ = this.locationService.findAll();
  }

  cancelEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  delete(location: Location) {
    const dialogRef = this.dialogService.confirm(
      {
        title: 'Delete location',
        message: `Are you sure you want to delete location ${location.name}?`
      }
    );

    dialogRef.afterClosed()
      .pipe(
        filter(data => data),
        tap(() => this.locations$ = this.locationService.delete(location)
          .pipe(
            switchMap(() => this.locationService.findAll())
          )
        ),
        take(1)
      ).subscribe();
  }

  edit(location: Location) {
    this.router.navigateByUrl(this.router.url + '/edit/' + location.name);
  }

  showInGoogleMaps(location: Location) {
    const googleLoc = `http://www.google.com/maps/place/${location.long},${location.lat}/@${location.long},${location.lat},17z/data=!3m1!1e3`;

    window.open(googleLoc, '_blank');
  }

  trackLocation(_: number, location: Location) {
    return location.name;
  }

}
