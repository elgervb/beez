import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { QRBeezModel } from 'src/app/shared/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { EMPTY_HANDLER } from 'src/app/shared/testing';

import { ScannerComponent } from './scanner.component';

describe('ScannerComponent', () => {
  let component: ScannerComponent;
  let fixture: ComponentFixture<ScannerComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerComponent ],
      imports: [ I18nextTestingModule, MaterialModule, RouterTestingModule, SharedModule, ZXingScannerModule ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    // this is here to catch error '@zxing/ngx-scanner Can't get user media, this is not supported.'
    jest.spyOn(console, 'error').mockImplementation(EMPTY_HANDLER);

    fixture = TestBed.createComponent(ScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on success hive', () => {
    const navigateSpy = jest.spyOn(TestBed.inject(Router), 'navigate');
    const result: QRBeezModel = {
      type: 'hive',
      id: 'asdf'
    };

    component.scanSuccessHandler(JSON.stringify(result));

    expect(navigateSpy).toHaveBeenCalledWith([ '/hives', result.id ]);
  });

  it('should navigate on success queen', () => {
    const navigateSpy = jest.spyOn(TestBed.inject(Router), 'navigate');
    const result: QRBeezModel = {
      type: 'queen',
      id: 'asdf'
    };

    component.scanSuccessHandler(JSON.stringify(result));

    expect(navigateSpy).toHaveBeenCalledWith([ '/queens', result.id ]);
  });

  it('should throw when type is unexpected', () => {
    const result = {
      type: 'blabla',
      id: 'asdf'
    };

    expect(() => component.scanSuccessHandler(JSON.stringify(result))).toThrowError('no such type found blabla');
  });
});
