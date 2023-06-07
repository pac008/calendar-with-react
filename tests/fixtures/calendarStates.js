export const events = [
  {
    id: '1',
    title: 'Cumple de Miguel',
    notes: 'hay que comprar cerveza',
    start: new Date('2023-11-23 13:00:00'),
    end: new Date('2023-11-23 15:00:00'),
    bgColor: '#FAFAFA',
    user: {
      _id: '123',
      name: 'Miguel',
    },
  },
  {
    id: '2',
    title: 'Cumple de Mi amor',
    notes: 'hay que comprar cerveza',
    start: new Date('2023-05-05 13:00:00'),
    end: new Date('2023-05-05 15:00:00'),
    bgColor: '#FAFAFA',
    user: {
      _id: '123',
      name: 'Miguel',
    },
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
