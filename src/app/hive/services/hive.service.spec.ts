import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { transform } from '@elgervb/mock-data';
import { AuthService } from 'auth';
import { Hive } from '../models';

import { HiveService } from './hive.service';

describe('HiveService', () => {
  let service: HiveService;
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
    service = TestBed.inject(HiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a hive', () => {
    service.createHive(transform<Hive>({}));

    expect(collection.add).toHaveBeenCalled();
  });
});
