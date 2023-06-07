import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store/calendar/calendarSlice';
import { convertEventsToDateEvents } from './convertsEventToDateEvents';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async calendarEvent => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent }));
        return;
      }

      const { data } = await calendarApi.post('/events', calendarEvent);
      console.log(data);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire('error al guardar', error.response.data.msg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log('error', error);
      Swal.fire('error al eliminar', error.response.data.msg, 'error');
    }
  };

  const startLogingEvent = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('error,', error);
    }
  };
  return {
    activeEvent,
    events,
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    startLogingEvent,
  };
};
