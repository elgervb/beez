import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentReference } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { from, transform } from '@elgervb/mock-data';
import { I18NextModule } from 'angular-i18next';
import { TimestampPipe } from 'components';
import { LedgerEntry } from '../../models';
import { of } from 'rxjs';
import { LedgerService } from '../../services/ledger.service';

import { LegderComponent } from './legder.component';
import { SumPipe } from '../../pipes/sum.pipe';

describe('LegderComponent', () => {
  let component: LegderComponent;
  let fixture: ComponentFixture<LegderComponent>;
  const ledgerService: Partial<LedgerService> = {
    createEntry: jest.fn(() => of(transform<DocumentReference<LedgerEntry>>({}))),
    getEntries: jest.fn()
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ LegderComponent, SumPipe, TimestampPipe ],
      providers: [ { provide: LedgerService, useValue: ledgerService } ],
      imports: [ RouterTestingModule, I18NextModule.forRoot() ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an item', () => {
    const entry = from<LedgerEntry>('LedgerEntry');
    component.addEntry(entry);

    expect(ledgerService.createEntry).toHaveBeenCalled();
  });

  it('should get all items on init', () => {
    expect(ledgerService.getEntries).toHaveBeenCalled();
  });
});
