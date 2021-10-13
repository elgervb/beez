import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { HiveAction } from '..';

import { HiveActionsComponent } from './hive-actions.component';

describe('HiveActionsComponent', () => {
  let component: HiveActionsComponent;
  let fixture: ComponentFixture<HiveActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiveActionsComponent],
      imports: [I18nextTestingModule, MaterialModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete hive action', done => {
    component.action$.subscribe(action => {
      expect(action).toBe(HiveAction.deleteHive);
      done();
    });

    component.deleteHive();
  });

  it('should emit navigate to edit action', done => {
    component.action$.subscribe(action => {
      expect(action).toBe(HiveAction.navigateToEdit);
      done();
    });

    component.navigateToEdit();
  });

  it('should emit print QR action', done => {
    component.action$.subscribe(action => {
      expect(action).toBe(HiveAction.printQRCode);
      done();
    });

    component.printQRCode();
  });
});
