import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { Location } from '@common/location';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  edit$?: Observable<Location>;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.name) {
      this.edit$ = this.locationService.findOne(this.route.snapshot.params.name);
    }
  }

  save(location: Location) {
    this.locationService.save(location)
      .pipe(
        tap(() => this.router.navigate([this.edit$ ? '../..' : '..'], { relativeTo: this.route })),
        take(1)
      )
      .subscribe();
  }

}
