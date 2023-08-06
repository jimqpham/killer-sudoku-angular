import { Injectable } from '@angular/core';
import { GridService } from '../grid.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PageLoadActions } from './grid.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class GridEffects {
  constructor(
    private readonly _gridService: GridService,
    private readonly _actions$: Actions
  ) {}

  readonly fetchData$ = createEffect(() =>
    this._actions$.pipe(
      ofType(PageLoadActions.fetchData),
      switchMap(() =>
        this._gridService.board$.pipe(
          map((solution) =>
            PageLoadActions.fetchDataSuccess({ payload: solution })
          )
        )
      ),
      catchError(() =>
        of(
          PageLoadActions.fetchDataFailure({ payload: 'Unable to load data.' })
        )
      )
    )
  );
}
