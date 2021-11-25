import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDotComponent } from './color-dot.component';

describe('ColorDotComponent', () => {
  let component: ColorDotComponent;
  let fixture: ComponentFixture<ColorDotComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ColorDotComponent ],
      teardown: { destroyAfterEach: false }
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
