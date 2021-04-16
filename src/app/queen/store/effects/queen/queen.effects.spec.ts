import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { QueenEffects } from './queen.effects';

describe('QueenEffects', () => {
  let actions$: Observable<any>;
  let effects: QueenEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QueenEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(QueenEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
