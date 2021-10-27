import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'auth';

import { PreferencesService } from './preferences.service';

describe('PreferencesService', () => {

  const authService = jest.fn();
  const angularFirestore = jest.fn();
  let service: PreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: AngularFirestore, useValue: angularFirestore },
      ]
    });
    service = TestBed.inject(PreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
