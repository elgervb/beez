import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiveFormComponent } from './hive-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('HiveFormComponent', () => {
  let component: HiveFormComponent;
  let fixture: ComponentFixture<HiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HiveFormComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
