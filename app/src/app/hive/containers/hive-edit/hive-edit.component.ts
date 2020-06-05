import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HiveService } from '../../services/hive.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { Location } from '@common/location';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/location/services/location.service';

@Component({
  selector: 'app-hive-edit',
  templateUrl: './hive-edit.component.html',
  styleUrls: ['./hive-edit.component.css']
})
export class HiveEditComponent implements OnInit {

  form: FormGroup;
  locations$: Observable<Location[]>;

  constructor(
    private formBuilder: FormBuilder,
    private hiveService: HiveService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      number: [''],
      type: [''],
      location: ['']
    });

    this.locations$ = this.locationService.findAll();
  }

  save() {
    if (this.form.valid) {
      this.hiveService.save(this.form.value)
        .pipe(
          tap(() => this.router.navigate(['..'], { relativeTo: this.route })),
          take(1)
        )
        .subscribe();
    }
  }

  trackLocation(_: number, location: Location) {
    return location.name;
  }

}
