import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { PageLoadActions } from './grid.actions';
import { Digit } from './grid.models';

const initialGridState = { solution: [1, 2, 3] as Digit[] };

export const gridReducer = createReducer(
  initialGridState,
  immerOn(PageLoadActions.fetchDataSuccess, (state, action) => {
    state.solution = action.payload;
  })
);
