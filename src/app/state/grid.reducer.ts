import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import {
  PageLoadActions,
  setActiveArea,
  unsetActiveArea,
} from './grid.actions';
import { Digit, GridState } from './grid.models';

const initialGridState: GridState = {
  solution: [] as Digit[],
  areas: [] as string[],
  activeArea: undefined,
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
  })
);
