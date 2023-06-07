import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

jest.mock('../../../src/hooks/useCalendarStore');

describe('Pruebas en <FabDelete />', () => {

  const mockstartDeletingEvent = jest.fn();
  beforeEach( () => jest.clearAllMocks() );
  test('should display the component correctly', () => {
    useCalendarStore.mockReturnValue({
      startDeletingEvent: jest.fn(),
    });

    render(<FabDelete />);
    const btn = screen.getByLabelText('btn-delete');
    expect(btn.classList).toContain('btn');
    expect(btn.classList).toContain('btn-danger');
    expect(btn.classList).toContain('fab-danger');
  });
  test('should call startDeletingEvent when the button is clicked correctly', () => {
    useCalendarStore.mockReturnValue({
      startDeletingEvent: mockstartDeletingEvent
    });

    render(<FabDelete />);
    const btn = screen.getByLabelText('btn-delete');
    fireEvent.click( btn );
    expect(mockstartDeletingEvent).toHaveBeenCalled();
  });
});
