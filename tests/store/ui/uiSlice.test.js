import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice';

describe('test in uiSlice', () => {
  test('should return the defualt state ', () => {
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
  });
  test('should change isDateModalOpen correctly', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();
    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
