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

export const clickCellIdx = createAction(
  '[Grid - User Click] Click Cell Index',
  props<{ payload: number }>()
);

export const resetSelectedCellIdxCorrectAnswer = createAction(
  '[Grid - Correct Answer] Reset Selected Cell Index'
);

export const setEnteredValue = createAction(
  '[Grid - User Key Press] Set Entered Value',
  props<{ payload: Digit }>()
);

export const resetEnteredValueWrongAnswer = createAction(
  '[Grid - Wrong Answer Resetting] Reset Entered Value',
  props<{ payload: number }>()
);
