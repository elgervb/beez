import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueenOverviewComponent } from './queen-overview.component';
import { QueenService } from '../../services/queen.service';

describe('QueenOverviewComponent', () => {
  let component: QueenOverviewComponent;
  let fixture: ComponentFixture<QueenOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QueenOverviewComponent],
      providers: [QueenService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueenOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
