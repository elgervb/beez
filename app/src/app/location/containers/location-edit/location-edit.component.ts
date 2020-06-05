import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lat: [''],
      long: ['']
    });
  }

  save() {
    if (this.form.valid) {
      this.locationService.save(this.form.value)
        .pipe(
          tap(() => this.router.navigate(['..'], { relativeTo: this.route })),
          take(1)
        )
        .subscribe();
    }
  }

}
