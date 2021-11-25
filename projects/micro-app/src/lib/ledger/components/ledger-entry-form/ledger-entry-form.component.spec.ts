import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { LedgerEntry } from '../../models';

import { LedgerEntryFormComponent } from './ledger-entry-form.component';

describe('LedgerEntryFormComponent', () => {
  let component: LedgerEntryFormComponent;
  let fixture: ComponentFixture<LedgerEntryFormComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [LedgerEntryFormComponent],
    imports: [ReactiveFormsModule, I18NextModule.forRoot()],
    schemas: [NO_ERRORS_SCHEMA],
    teardown: { destroyAfterEach: false }
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a cancel event', () => {
    const cancelSpy = jest.spyOn(component.cancelEvent, 'emit');
    component.cancel();

    expect(cancelSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit a submit event', () => {
    let result: LedgerEntry | undefined;
    const submitSpy = jest.spyOn(component.submitEvent, 'emit').mockImplementation(res => result = res);
    component.form.patchValue({ description: 'desc', amountEur: '5', amountCents: '5' });
    component.submit();

    expect(submitSpy).toHaveBeenCalledTimes(1);

    expect(result).toBeDefined();
    expect(result?.amount).toBe(5.50);
  });

  it('should not emit a submit event when form is invalid', () => {
    const submitSpy = jest.spyOn(component.submitEvent, 'emit');
    component.form.patchValue({ description: 'desc', amountEur: undefined, amountCents: '5' });
    component.submit();

    expect(component.form.valid).toBe(false);
    expect(submitSpy).not.toHaveBeenCalled();
  });
});
