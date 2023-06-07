import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { calendarApi } from '../../src/api';
import { useAuthStore } from '../../src/hooks';
import { authSlice } from '../../src/store';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testuser';

const getMockStore = initialState => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe('test in useAuthStore', () => {
  beforeEach(() => localStorage.clear());
  test('should return defaults values', () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
      startlogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });
  test('should do the login correctly', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.startlogin({ ...testUserCredentials });
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      status: 'authenticated',
      user: {
        ok: true,
        uid: '63dd0fdd87cb9f355ca10511',
        name: 'miguel',
        token: expect.any(String),
      },
      errorMessage: undefined,
    });
    expect(localStorage.getItem('token')).toEqual(user.token);
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });
  test('startLogin should faild the autentication', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.startlogin({
        email: 'error@error.error',
        password: '123456',
      });
    });
    const { errorMessage, status, user } = result.current;
    expect(localStorage.getItem('token')).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: 'credenciales incorrectas',
    });
    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });
  test('startRegister should create an user', async () => {
    const newUser = {
      email: 'algo@algo.algo',
      name: 'test user create',
      password: '123456',
    };
    const dataResponse = {
      ok: true,
      uid: '123456',
      name: 'test user create',
      token: 'abc-123',
    };
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: dataResponse,
    });
    await act(async () => {
      await result.current.startRegister(newUser);
    });
    const { errorMessage, user, status } = result.current;
    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: dataResponse,
    });
    spy.mockRestore();
  });
  test('startRegister should faild creating', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });
    const { errorMessage, user, status } = result.current;
    expect({ errorMessage, user, status }).toEqual({
      errorMessage: 'El usuario ya existe',
      status: 'not-authenticated',
      user: {},
    });
  });
  test('checkAuthToken should failt if not exists token', async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { errorMessage, user, status } = result.current;
    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {},
    });
  });
  test('checkAuthToken should authenticate if exists token', async () => {

    const { data } = await calendarApi.post('/auth', testUserCredentials); 
    localStorage.setItem('token', data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { errorMessage, user, status } = result.current;
    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: {
        ok: true,
        token: expect.any(String),
        uid: '63dd0fdd87cb9f355ca10511',
        name: 'miguel'
      },
    });
  });
});
