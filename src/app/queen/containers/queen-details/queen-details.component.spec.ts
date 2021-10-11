import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { QueenService } from '../../services/queen.service';

import { QueenDetailsComponent } from './queen-details.component';

describe('QueenDetailsComponent', () => {
  let component: QueenDetailsComponent;
  let fixture: ComponentFixture<QueenDetailsComponent>;
  const queenService: Partial<QueenService> = {
    getQueen: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueenDetailsComponent ],
      imports: [ I18nextTestingModule, MaterialModule, RouterTestingModule, SharedModule ],
      providers: [ { provide: QueenService, useValue: queenService }, ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
