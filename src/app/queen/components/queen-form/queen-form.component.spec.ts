import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueenFormComponent } from './queen-form.component';

describe('QueenFormComponent', () => {
  let component: QueenFormComponent;
  let fixture: ComponentFixture<QueenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueenFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
