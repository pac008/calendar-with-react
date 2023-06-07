import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal, onSetActiveEvent } from '../store';

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector(state => state.ui);
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
    dispatch(onSetActiveEvent(null));

  };
  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
  };
};
