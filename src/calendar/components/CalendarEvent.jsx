/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { memo } from 'react';


export const CalendarEvent = memo(({ event }) => {
    
    const { title, user } = event;

  return (
    <>
      <strong> {title} </strong>
      <span> -{user.name}</span>
    </>
  );
});
