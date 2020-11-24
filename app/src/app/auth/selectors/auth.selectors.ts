import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const getToken = createSelector(selectAuthState, state => state.token);
export const getError = createSelector(selectAuthState, state => state.error);
