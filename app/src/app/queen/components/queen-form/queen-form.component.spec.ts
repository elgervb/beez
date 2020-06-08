import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueenFormComponent } from './queen-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('QueenFormComponent', () => {
  let component: QueenFormComponent;
  let fixture: ComponentFixture<QueenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QueenFormComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
