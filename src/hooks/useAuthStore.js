import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { onChecking, onLogin, onLogout, clearErrorMessage, onLogoutCalendar } from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const startlogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin(data));
    } catch (error) {
      dispatch(onLogout('credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin(data));
    } catch (error) {
      const msg = error.response.data?.msg;
      dispatch(onLogout(msg));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());
    try {
      const { data } = await calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin(data));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };
  
  return {
    status,
    user,
    errorMessage,
    startlogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
