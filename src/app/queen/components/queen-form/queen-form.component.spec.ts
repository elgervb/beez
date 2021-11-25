import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'components';
import { SharedModule } from 'src/app/shared/shared.module';

import { QueenFormComponent } from './queen-form.component';

describe('QueenFormComponent', () => {
  let component: QueenFormComponent;
  let fixture: ComponentFixture<QueenFormComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ QueenFormComponent ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      teardown: { destroyAfterEach: false }
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
