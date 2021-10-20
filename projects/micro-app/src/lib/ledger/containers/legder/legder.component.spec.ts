import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegderComponent } from './legder.component';

describe('LegderComponent', () => {
  let component: LegderComponent;
  let fixture: ComponentFixture<LegderComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ LegderComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
