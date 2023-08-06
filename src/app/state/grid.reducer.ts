import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { PageLoadActions } from './grid.actions';
import { Digit, GridState } from './grid.models';

const initialGridState: GridState = {
  solution: [] as Digit[],
  areas: [] as string[],
};

export const gridReducer = createReducer(
  initialGridState,
  immerOn(PageLoadActions.fetchDataSuccess, (state, action) => {
    state.solution = action.payload;
  })
);
