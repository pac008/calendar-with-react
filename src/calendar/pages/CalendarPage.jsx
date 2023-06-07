import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessagesEs, localizer } from '../../helpers';
import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from '../index';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export function CalendarPage() {
  const { user } = useAuthStore()
  const { events, setActiveEvent, activeEvent, startLogingEvent} = useCalendarStore();
  const { openDateModal, isDateModalOpen } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'agenda'
  );
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    const isMyEvent = ( user.uid === event.user._id );
    const style = {
      backgroundColor: !isMyEvent ? '#465660' : '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };
    return {
      style,
    };
  };
  const onDoubleClick = event => {
    openDateModal();
  };
  const onSelect = event => {
    setActiveEvent(event);
  };
  const onViewChanged = event => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  useEffect(() => {
    startLogingEvent()
  }, [])
  
  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        culture='es'
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        defaultView={lastView}
      />
      <CalendarModal />
      <FabAddNew />
      {activeEvent && !isDateModalOpen && <FabDelete />}
    </>
  );
}
