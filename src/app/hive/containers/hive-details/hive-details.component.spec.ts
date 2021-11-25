import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { transform } from '@elgervb/mock-data';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { Subject } from 'rxjs';
import { MaterialModule, TimestampPipe } from 'components';
import { SharedModule } from 'src/app/shared/shared.module';
import { EMPTY_HANDLER } from 'src/app/shared/testing';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
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
    instance: { action$: new Subject<string>() }
  };
  const bottomSheet = {
    open: () => sheet
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ HiveDetailsComponent, TimestampPipe ],
      imports: [ MaterialModule, NgxQRCodeModule, RouterTestingModule, SharedModule, I18nextTestingModule ],
      providers: [
        { provide: HiveService, useValue: hiveService },
        { provide: MatBottomSheet, useValue: bottomSheet }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      teardown: { destroyAfterEach: false }
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
    let navSpy: jest.SpyInstance;
    let route: ActivatedRoute;

    beforeEach(() => {
      navSpy = jest.spyOn(TestBed.inject(Router), 'navigate').mockImplementationOnce(() => Promise.resolve(true));
      route = TestBed.inject(ActivatedRoute);
    });

    describe('navigation', () => {
      it('should navigate to edit', () => {
        component.navigateToEdit();
        expect(navSpy).toHaveBeenCalledWith([ 'edit' ], { relativeTo: route });
      });

      it('should navigate to inspections', () => {
        component.navigateToInspections();
        expect(navSpy).toHaveBeenCalledWith([ 'inspections' ], { relativeTo: route });
      });

      it('should navigate back', () => {
        component.back();
        expect(navSpy).toHaveBeenCalledWith([ '..' ], { relativeTo: route });
      });
    });

    describe('bottom sheet actions', () => {
      let deleteSpy: jest.SpyInstance;
      let navigateSpy: jest.SpyInstance;
      let printSpy: jest.SpyInstance;

      beforeEach(() => {
        deleteSpy = jest.spyOn(component, 'deleteHive').mockImplementation(EMPTY_HANDLER);
        navigateSpy = jest.spyOn(component, 'navigateToEdit').mockImplementation(EMPTY_HANDLER);
        printSpy = jest.spyOn(component, 'printQRcode').mockImplementation(EMPTY_HANDLER);
      });

      it('should call delete', () => {
        component.openBottomSheet(transform<Hive>({}));
        sheet.instance.action$.next('delete');

        expect(deleteSpy).toHaveBeenCalled();
      });

      it('should call navigate', () => {
        component.openBottomSheet(transform<Hive>({}));
        sheet.instance.action$.next('edit');

        expect(navigateSpy).toHaveBeenCalled();
      });

      it('should call print', () => {
        component.openBottomSheet(transform<Hive>({}));
        sheet.instance.action$.next('printQR');

        expect(printSpy).toHaveBeenCalled();
      });
    });
  });
});
