import calendarApi from '../../src/api/calendarApi';

describe('test in calendarApi', () => {
  test('should have the default config', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });
  test('should have the token from localStorage in the header of the request', async () => {
    const token = 'abc-123-xyz';
    localStorage.setItem('token', token);
    const resp = await calendarApi.get('/events').catch(err => err);
    expect(resp.config.headers['x-token']).toBe(token);
  });
});
