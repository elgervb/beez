import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionOverviewComponent } from './inspection-overview.component';

describe('InspectionOverviewComponent', () => {
  let component: InspectionOverviewComponent;
  let fixture: ComponentFixture<InspectionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
