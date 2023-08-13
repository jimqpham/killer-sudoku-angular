import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import {
  PageLoadActions,
  resetEnteredValueWrongAnswer,
  setActiveArea,
  setEnteredValue,
  clickCellIdx,
  unsetActiveArea,
  resetSelectedCellIdxCorrectAnswer,
} from './grid.actions';
import { GridState } from './grid.models';

const initialGridState: GridState = {
  solution: Array(81).fill(undefined),
  areas: Array(81).fill(undefined),
  enteredValue: Array(81).fill(undefined),
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
  immerOn(clickCellIdx, (state, action) => {
    if (state.selectedCellIdx === action.payload)
      state.selectedCellIdx = undefined;
    else state.selectedCellIdx = action.payload;
  }),
  immerOn(setEnteredValue, (state, action) => {
    if (state.selectedCellIdx !== undefined)
      state.enteredValue[state.selectedCellIdx] = action.payload;
  }),
  immerOn(resetEnteredValueWrongAnswer, (state, action) => {
    state.enteredValue[action.payload] = undefined;
  }),
  immerOn(resetSelectedCellIdxCorrectAnswer, (state) => {
    state.selectedCellIdx = undefined;
  })
);
