import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent } = useCalendarStore();
  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button className='btn btn-danger fab-danger' aria-label='btn-delete' onClick={handleDelete}>
      <i className='fas fa-trash-alt'></i>
    </button>
  );
};
