import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { HiveFormComponent } from './hive-form.component';

describe('HiveFormComponent', () => {
  let component: HiveFormComponent;
  let fixture: ComponentFixture<HiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiveFormComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
