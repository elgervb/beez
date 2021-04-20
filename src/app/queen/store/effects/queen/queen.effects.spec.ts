import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Queen } from 'src/app/queen/models';
import { QueenService } from 'src/app/queen/services/queen.service';

import { QueenEffects } from './queen.effects';

import * as fromQueen from '../../';
import { cold, hot } from 'jasmine-marbles';

describe('QueenEffects', () => {
  let actions$: Observable<any>;
  let effects: QueenEffects;

  const queen: Queen = {
    name: 'q1',
  };

  const queenService = {
    createQueen: jest.fn(),
    deleteQueen: jest.fn(),
    getQueens: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QueenEffects,
        provideMockActions(() => actions$),
        { provide: QueenService, useValue: queenService }
      ]
    });

    effects = TestBed.inject(QueenEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should create a queen', () => {
    const action = fromQueen.addQueen({ queen });
    const result = fromQueen.addQueenSuccess();

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: queen });
    queenService.createQueen.mockReturnValue(response);

    const expected = cold('--b', { b: result });
    expect(effects.addQueen$).toBeObservable(expected);
  });

  it('should delete a queen', () => {
    const action = fromQueen.deleteQueen({ queen });
    const result = fromQueen.deleteQueenSuccess();

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: queen });
    queenService.deleteQueen.mockReturnValue(response);

    const expected = cold('--b', { b: result });
    expect(effects.deleteQueen$).toBeObservable(expected);
  });

  it('should load all queens', () => {
    const queens = [{ ...queen, ...queen }];
    const action = fromQueen.loadQueens();
    const result = fromQueen.loadQueensSuccess({ queens });

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: queens });
    queenService.getQueens.mockReturnValue({ valueChanges: jest.fn().mockReturnValue(response) });

    const expected = cold('--b', { b: result });
    expect(effects.loadQueens$).toBeObservable(expected);
  });
});
