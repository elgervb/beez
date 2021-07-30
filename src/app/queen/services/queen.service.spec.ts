import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'auth';

import { QueenService } from './queen.service';

describe('QueenService', () => {
  let service: QueenService;
  const angularFirestore = jest.fn();
  const authService = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFirestore },
        { provide: AuthService, useValue: authService }
      ]
    });
    service = TestBed.inject(QueenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
