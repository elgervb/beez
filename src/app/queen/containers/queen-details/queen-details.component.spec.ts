import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueenDetailsComponent } from './queen-details.component';

describe('QueenDetailsComponent', () => {
  let component: QueenDetailsComponent;
  let fixture: ComponentFixture<QueenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueenDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
