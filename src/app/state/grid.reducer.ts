import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import {
  PageLoadActions,
  setActiveArea,
  setEnteredValue,
  toggleSelectedCellIdx,
  unsetActiveArea,
} from './grid.actions';
import { Digit, GridState } from './grid.models';

const initialGridState: GridState = {
  solution: [] as Digit[],
  areas: [] as string[],
  activeArea: undefined,
  enteredValue: [],
};

export const gridReducer = createReducer(
  initialGridState,
  immerOn(PageLoadActions.fetchDataSuccess, (state, action) => {
    state.solution = action.payload.solution;
    state.areas = action.payload.areas;
  }),
  immerOn(setActiveArea, (state, action) => {
    state.activeArea = action.payload;
  }),
  immerOn(unsetActiveArea, (state) => {
    state.activeArea = undefined;
  }),
  immerOn(toggleSelectedCellIdx, (state, action) => {
    if (state.selectedCellIdx === action.payload)
      state.selectedCellIdx = undefined;
    else state.selectedCellIdx = action.payload;
  }),
  immerOn(setEnteredValue, (state, action) => {
    if (state.selectedCellIdx !== undefined)
      state.enteredValue[state.selectedCellIdx] = action.payload;
  })
);
