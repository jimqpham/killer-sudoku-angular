import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { PageLoadActions } from './grid.actions';
import { Digit, GridState } from './grid.models';

const initialGridState: GridState = {
  solution: [] as Digit[],
  areas: Array(9)
    .fill(null)
    .flatMap(() => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']),
};

export const gridReducer = createReducer(
  initialGridState,
  immerOn(PageLoadActions.fetchDataSuccess, (state, action) => {
    state.solution = action.payload;
  })
);
