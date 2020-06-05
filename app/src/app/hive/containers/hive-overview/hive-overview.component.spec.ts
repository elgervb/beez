import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiveOverviewComponent } from './hive-overview.component';
import { HiveService } from '../../services/hive.service';

describe('HiveOverviewComponent', () => {
  let component: HiveOverviewComponent;
  let fixture: ComponentFixture<HiveOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HiveOverviewComponent],
      providers: [HiveService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
