import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { transform } from '@elgervb/mock-data';
import { AuthService } from 'auth';
import { Observable, of } from 'rxjs';

import { defaultPreferences, Preferences, PreferencesService } from './preferences.service';

describe('PreferencesService', () => {

  const authService = jest.fn();
  const getCollection = jest.fn();
  const addCollection = jest.fn();
  const doc = jest.fn(() => ({ get: jest.fn(() => of()), data: jest.fn() }));
  const angularFirestore = {
    collection: jest.fn(() => ({ get: getCollection, add: addCollection, doc }))
  };
  let service: PreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: AngularFirestore, useValue: angularFirestore },
      ],
      teardown: { destroyAfterEach: false }
    });
    service = TestBed.inject(PreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get default preferences', done => {
    getCollection.mockReturnValue(of([]));

    const result = service.get();

    expect(result).toBeInstanceOf(Observable);
    result.subscribe(prefs => {
      expect(prefs).toBe(defaultPreferences);
      done();
    });
  });

  it('should get preferences', done => {
    const pref = { language: 'en' };
    const prefFn = { data: () => (pref) };
    const prefs = { size: 1, docs: [ prefFn ] };
    getCollection.mockReturnValue(of(prefs));

    const result = service.get();

    expect(result).toBeInstanceOf(Observable);
    result.subscribe(p => {
      expect(p).toBe(pref);
      done();
    });
  });

  it('should update preferences', () => {

    addCollection.mockResolvedValue({ id: 'docId' });

    const result = service.update(transform<Preferences>({ language: 'mock' }));

    expect(result).toBeInstanceOf(Observable);

  });
});
