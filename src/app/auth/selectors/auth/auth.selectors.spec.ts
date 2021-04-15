import * as fromAuth from '../../reducers/auth/auth.reducer';
import { selectAuthState, selectUser } from './auth.selectors';

describe('Auth Selectors', () => {

  const state: fromAuth.State = {
    user: {
      displayName: 'this user',
      photoURL: 'https://asfd.png',
      uid: '1234'
    }
  };

  it('should select the feature state', () => {
    const result = selectAuthState({
      [fromAuth.authFeatureKey]: {}
    });

    expect(result).toEqual({});
  });

  it('should select user', () => {
    const result = selectUser.projector(state);

    expect(result).toBe(state.user);
  });
});
