import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from '../../fixtures/calendarStates';

describe('test in calendarSlice', () => {
  test('should return default state', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });
  test('onSetActiveEvent should active the event', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state).toEqual(calendarWithActiveEventState);
  });
  test('onAddNewEvent should add the new event', () => {
    const newEvent = {
      id: '3',
      title: 'Cumple de May',
      notes: 'hay que comprar cerveza',
      start: new Date('2023-06-21 13:00:00'),
      end: new Date('2023-06-21 15:00:00'),
      bgColor: '#FAFAFA',
      user: {
        _id: '123',
        name: 'Miguel',
      },
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    expect(state.events).toEqual([...events, newEvent]);
  });
  test('onUpdateEvent should update the event', () => {
    const eventUpdated = {
      id: '1',
      title: 'Cumple de Miguel!!',
      notes: 'hay que comprar cerveza!!',
      start: new Date('2023-11-23 13:00:00'),
      end: new Date('2023-11-23 15:00:00'),
      bgColor: '#FAFAFA',
      user: {
        _id: '123',
        name: 'Miguel',
      },
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(eventUpdated)
    );
    expect(state.events).toContain(eventUpdated);
  });
  test('onDeleteEvent should delete the active event ', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    console.log(state);
    expect(state).toEqual({
      activeEvent: null,
      events: [
        {
          bgColor: '#FAFAFA',
          end: new Date('2023-05-05 15:00:00'),
          id: '2',
          notes: 'hay que comprar cerveza',
          start: new Date('2023-05-05 13:00:00'),
          title: 'Cumple de Mi amor',
          user: { _id: '123', name: 'Miguel' },
        },
      ],
      isLoadingEvents: false,
    });
  });
  test('onLoadEvent should load the events ', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state).toEqual(calendarWithEventsState);
  });
  test('onLogoutCalendar should clear the state ', () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onLogoutCalendar());
    expect(state).toEqual(initialState);
  });
});
