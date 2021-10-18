import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RouterTestingModule } from '@angular/router/testing';
import { transform } from '@elgervb/mock-data';
import { Subject } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { Queen } from '../../models';
import { QueenService } from '../../services/queen.service';

import { QueenDetailsComponent } from './queen-details.component';

describe('QueenDetailsComponent', () => {
  let component: QueenDetailsComponent;
  let fixture: ComponentFixture<QueenDetailsComponent>;
  const queenService: Partial<QueenService> = {
    getQueen: jest.fn()
  };
  const sheet = {
    instance: { action$: new Subject<string>() }
  };
  const bottomSheet = {
    open: () => sheet
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ QueenDetailsComponent ],
      imports: [ I18nextTestingModule, MaterialModule, RouterTestingModule, SharedModule ],
      providers: [
        { provide: QueenService, useValue: queenService },
        { provide: MatBottomSheet, useValue: bottomSheet }
      ],
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

  describe('bottomSheet', () => {
    let deleteSpy: jest.SpyInstance;
    let navigateSpy: jest.SpyInstance;

    beforeEach(() => {
      deleteSpy = jest.spyOn(component, 'deleteQueen').mockImplementation(() => {});
      navigateSpy = jest.spyOn(component, 'navigateToEdit').mockImplementation(() => {});
    });

    it('should call delete', () => {
      component.openBottomSheet(transform<Queen>({}));
      sheet.instance.action$.next('delete');

      expect(deleteSpy).toHaveBeenCalled();
    });

    it('should call navigate', () => {
      component.openBottomSheet(transform<Queen>({}));
      sheet.instance.action$.next('edit');

      expect(navigateSpy).toHaveBeenCalled();
    });
  });
});
