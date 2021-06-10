import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth';

import { InspectionService } from './inspection.service';

describe('InspectionService', () => {
  let service: InspectionService;
  const angularFirestore = jest.fn();
  const authService = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFirestore },
        { provide: AuthService, useValue: authService }
      ]
    });
    service = TestBed.inject(InspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});