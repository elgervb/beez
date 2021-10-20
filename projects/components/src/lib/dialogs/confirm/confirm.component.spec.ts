import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { I18nextTestingModule } from 'components';
import { MaterialModule } from '../../material.module';

import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmComponent ],
      imports: [
        I18nextTestingModule,
        MaterialModule
      ],
      providers: [ { provide: MAT_DIALOG_DATA, useValue: {} } ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
