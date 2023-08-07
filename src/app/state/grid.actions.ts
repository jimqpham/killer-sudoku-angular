import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Digit } from './grid.models';

export const PageLoadActions = createActionGroup({
  source: 'Page Load',
  events: {
    'Fetch Data': emptyProps(),
    'Fetch Data Success': props<{
      payload: { solution: Digit[]; areas: string[] };
    }>(),
    'Fetch Data Failure': props<{ payload: string }>(),
  },
});

export const setActiveArea = createAction(
  '[Cursor Hover] Set Active Area',
  props<{ payload: string }>()
);

export const unsetActiveArea = createAction(
  '[Cursore Hover] Unset Active Area'
);
