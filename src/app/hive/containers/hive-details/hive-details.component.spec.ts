import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RouterTestingModule } from '@angular/router/testing';
import { transform } from '@elgervb/mock-data';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { Subject } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { HiveAction } from '../../components';
import { Hive } from '../../models';
import { HiveService } from '../../services/hive.service';

import { HiveDetailsComponent } from './hive-details.component';

describe('HiveDetailsComponent', () => {
  let component: HiveDetailsComponent;
  let fixture: ComponentFixture<HiveDetailsComponent>;
  const hiveService: Partial<HiveService> = {
    getHive: jest.fn()
  };
  const sheet = {
    instance: {action$: new Subject<HiveAction>()}
  };
  const bottomSheet = {
    open: jest.fn(() => sheet)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiveDetailsComponent],
      imports: [MaterialModule, NgxQRCodeModule, RouterTestingModule, SharedModule, I18nextTestingModule],
      providers: [
        { provide: HiveService, useValue: hiveService },
        { provide: MatBottomSheet, useValue: bottomSheet}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('bottom sheet actions', () => {
    let deleteSpy: jest.SpyInstance;
    let navigateSpy: jest.SpyInstance;
    let printSpy: jest.SpyInstance;

    beforeEach(() => {
      deleteSpy = jest.spyOn(component, 'deleteHive').mockImplementation(() => {});
      navigateSpy = jest.spyOn(component, 'navigateToEdit').mockImplementation(() => {});
      printSpy = jest.spyOn(component, 'printQRcode').mockImplementation(() => {});
    });

    it('should call delete', () => {
      component.openBottomSheet(transform<Hive>({}));
      sheet.instance.action$.next(HiveAction.deleteHive);

      expect(deleteSpy).toHaveBeenCalled();
    });

    it('should call navigate', () => {
      component.openBottomSheet(transform<Hive>({}));
      sheet.instance.action$.next(HiveAction.navigateToEdit);

      expect(navigateSpy).toHaveBeenCalled();
    });

    it('should call print', () => {
      component.openBottomSheet(transform<Hive>({}));
      sheet.instance.action$.next(HiveAction.printQRCode);

      expect(printSpy).toHaveBeenCalled();
    });
  });
});
