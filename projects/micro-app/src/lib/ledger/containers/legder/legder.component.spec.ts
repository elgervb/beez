import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LegderComponent } from './legder.component';

describe('LegderComponent', () => {
  let component: LegderComponent;
  let fixture: ComponentFixture<LegderComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ LegderComponent ],
      imports: [ RouterTestingModule ]
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
