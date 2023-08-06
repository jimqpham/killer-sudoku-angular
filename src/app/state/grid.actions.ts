import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Digit } from './grid.models';

export const PageLoadActions = createActionGroup({
  source: 'Page Load',
  events: {
    'Fetch Data': emptyProps(),
    'Fetch Data Success': props<{ payload: Digit[] }>(),
    'Fetch Data Failure': props<{ payload: string }>(),
  },
});
