import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { transform } from '@elgervb/mock-data';
import { AuthService } from 'auth';
import { Observable } from 'rxjs';
import { LedgerEntry } from '../models';

import { LedgerService } from './ledger.service';

describe('LedgerService', () => {
  let service: LedgerService;
  const collection = {
    add: jest.fn(() => Promise.resolve())
  };
  const angularFirestore = {
    collection: jest.fn(() => collection)
  };
  const authService = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFirestore },
        { provide: AuthService, useValue: authService }
      ],
      teardown: { destroyAfterEach: false }
    });
    service = TestBed.inject(LedgerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an enttry', () => {
    const result = service.createEntry(transform<LedgerEntry>({}));

    expect(result).toBeInstanceOf(Observable);
    expect(collection.add).toHaveBeenCalled();
  });
});
