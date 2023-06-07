import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>Calendar Page</h1>
}));

describe('test in appRotuer', () => {
  const mockCheckAuthToken = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('should display screen loading and call checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);
    expect(mockCheckAuthToken).toHaveBeenCalled();
    expect(screen.getByText('Cargando...')).toBeTruthy();
  });
  test('should display Loginscreen loading and call checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken,
    });
    const { container } = render(
      <MemoryRouter initialEntries={['/auth2/asdasd/s']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText('Ingreso')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  test('should display Calendar if is authenticated', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken,
    });
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText('Calendar Page')).toBeTruthy();
  });   
});
