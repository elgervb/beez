import { Component, OnInit } from '@angular/core';
import { HiveService } from '../../services/hive.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  edit?: Observable<Hive>;

  constructor(
    private hiveService: HiveService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.locations$ = this.locationService.findAll();

    if (this.route.snapshot.params.name) {
      this.edit = this.hiveService.findOne(this.route.snapshot.params.name);
    }
  }

  save(hive: Hive) {
    this.hiveService.save(hive)
      .pipe(
        tap(() => this.router.navigate([this.edit ? '../..' : '..'], { relativeTo: this.route })),
        take(1)
      )
      .subscribe();
  }
}
