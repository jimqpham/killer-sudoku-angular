import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectBridgesForCellIdx,
  selectAreaSumAtCellIdx,
  selectSolutionForCellIdx,
  selectAreaIdForCellIdx,
  selectActiveAreaId,
  selectSelectedCellIdx,
} from 'src/app/state/grid.selectors';
import { CellBridges } from 'src/app/types/types';
import {
  BRIDGE_WIDTH,
  CELL_PADDING,
  CELL_SIZE,
  INNER_CELL_SIZE,
} from 'src/app/utils/config';
import {
  setActiveArea,
  toggleSelectedCellIdx,
  unsetActiveArea,
} from 'src/app/state/grid.actions';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent implements OnDestroy {
  cellIdxSubject$ = new BehaviorSubject<number>(0);
  cellIdx$ = this.cellIdxSubject$.asObservable().pipe(distinctUntilChanged());
  @Input()
  set cellIdx(idx: number) {
    this.cellIdxSubject$.next(idx);
  }

  solution$: Observable<number>;
  bridges$: Observable<CellBridges>;
  displayAreaSum$: Observable<number | undefined>;
  areaId$: Observable<string>;
  isMouseOverSubject$ = new BehaviorSubject(false);
  isMouseOver$ = this.isMouseOverSubject$.asObservable();
  mouseClickSubject$ = new Subject<void>();
  isSelected$: Observable<boolean>;
  isActiveArea$: Observable<boolean>;
  destroy$ = new Subject<void>();

  innerCellSize = INNER_CELL_SIZE;
  cellPadding = CELL_PADDING;
  bridgeWidth = BRIDGE_WIDTH;
  cellSize = CELL_SIZE;

  constructor(private readonly _store: Store) {
    this.solution$ = this.cellIdx$.pipe(
      switchMap((cellIdx) => _store.select(selectSolutionForCellIdx(cellIdx)))
    );
    this.bridges$ = this.cellIdx$.pipe(
      switchMap((cellIdx) => _store.select(selectBridgesForCellIdx(cellIdx)))
    );
    this.displayAreaSum$ = this.cellIdx$.pipe(
      switchMap((cellIdx) => _store.select(selectAreaSumAtCellIdx(cellIdx)))
    );
    this.areaId$ = this.cellIdx$.pipe(
      switchMap((cellIdx) => _store.select(selectAreaIdForCellIdx(cellIdx)))
    );
    this.isMouseOverSubject$
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        withLatestFrom(this.areaId$)
      )
      .subscribe(([isMouseOver, areaId]) => {
        if (isMouseOver) _store.dispatch(setActiveArea({ payload: areaId }));
        else _store.dispatch(unsetActiveArea());
      });
    this.isActiveArea$ = combineLatest([
      this.areaId$,
      _store.select(selectActiveAreaId),
    ]).pipe(
      map(([currentAreaId, activeAreaId]) => currentAreaId === activeAreaId)
    );
    this.isSelected$ = combineLatest([
      this.cellIdx$,
      _store.select(selectSelectedCellIdx),
    ]).pipe(map(([cellIdx, selectedCellIdx]) => cellIdx === selectedCellIdx));
    this.mouseClickSubject$
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() =>
          this.cellIdx$.pipe(
            tap((cellIdx) => {
              _store.dispatch(toggleSelectedCellIdx({ payload: cellIdx }));
            })
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
