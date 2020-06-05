import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiveEditComponent } from './hive-edit.component';

describe('HiveEditComponent', () => {
  let component: HiveEditComponent;
  let fixture: ComponentFixture<HiveEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HiveEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
