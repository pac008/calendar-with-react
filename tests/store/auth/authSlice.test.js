import {
  authSlice,
  clearErrorMessage,
  onLogin,
  onLogout,
} from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testuser';

describe('test in authSlice', () => {
  test('should return the defualt state ', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
  test('should do login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });
  test('should do logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
    });
  });
  test('should do logout with errorMessage', () => {
    const errorMessage = 'Credentials not valid';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage,
    });
  });
  test('should do clear errorMessage', () => {
    const errorMessage = 'Credentials not valid';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    const newState = authSlice.reducer( state, clearErrorMessage())
    expect(newState.errorMessage).toBe(undefined);
  });
});
