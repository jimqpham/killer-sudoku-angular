import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Digit } from './grid.models';

export const PageLoadActions = createActionGroup({
  source: 'Grid - Page Load',
  events: {
    'Fetch Data': emptyProps(),
    'Fetch Data Success': props<{
      payload: { solution: Digit[]; areas: string[] };
    }>(),
    'Fetch Data Failure': props<{ payload: string }>(),
  },
});

export const setActiveArea = createAction(
  '[Grid - Cursor Hover] Set Active Area',
  props<{ payload: string }>()
);

export const unsetActiveArea = createAction(
  '[Grid - Cursor Hover] Unset Active Area'
);

export const toggleSelectedCellIdx = createAction(
  '[Grid - User Click] Toggle Selected Cell Index',
  props<{ payload: number }>()
);

export const setEnteredValue = createAction(
  '[Grid - User Key Press] Set Entered Value',
  props<{ payload: Digit }>()
);
