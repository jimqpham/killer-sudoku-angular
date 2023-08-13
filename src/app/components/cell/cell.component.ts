import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Observable,
  ReplaySubject,
  Subject,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
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
  selectEnteredValueForCellIdx,
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
  setEnteredValue,
  toggleSelectedCellIdx,
  unsetActiveArea,
} from 'src/app/state/grid.actions';
import { Digit } from 'src/app/state/grid.models';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent implements OnInit, OnDestroy {
  @Input()
  cellIdx!: number;

  solution$?: Observable<Digit | undefined>;
  enteredValue$?: Observable<number | undefined>;
  bridges$?: Observable<CellBridges>;
  displayAreaSum$?: Observable<number | undefined>;
  areaId$?: Observable<string>;
  isMouseOverSubject$ = new ReplaySubject<boolean>();
  isMouseOver$ = this.isMouseOverSubject$.asObservable();
  mouseClickSubject$ = new Subject<void>();
  keyPressSubject$ = new ReplaySubject<string>();
  keyPress$ = this.keyPressSubject$.asObservable();
  isSelected$?: Observable<boolean>;
  isActiveArea$?: Observable<boolean>;
  destroy$ = new Subject<void>();

  innerCellSize = INNER_CELL_SIZE;
  cellPadding = CELL_PADDING;
  bridgeWidth = BRIDGE_WIDTH;
  cellSize = CELL_SIZE;

  constructor(private readonly _store: Store) {}

  ngOnInit() {
    this.solution$ = this._store.select(selectSolutionForCellIdx[this.cellIdx]);
    this.enteredValue$ = this._store.select(
      selectEnteredValueForCellIdx[this.cellIdx]
    );
    this.bridges$ = this._store.select(selectBridgesForCellIdx[this.cellIdx]);
    this.displayAreaSum$ = this._store.select(
      selectAreaSumAtCellIdx[this.cellIdx]
    );
    this.areaId$ = this._store.select(selectAreaIdForCellIdx[this.cellIdx]);
    this.isSelected$ = this._store
      .select(selectSelectedCellIdx)
      .pipe(map((selectedCellIdx) => this.cellIdx === selectedCellIdx));
    this.isMouseOverSubject$
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        withLatestFrom(this.areaId$)
      )
      .subscribe(([isMouseOver, areaId]) => {
        if (isMouseOver) {
          this._store.dispatch(setActiveArea({ payload: areaId }));
        } else this._store.dispatch(unsetActiveArea());
      });
    this.isActiveArea$ = combineLatest([
      this.areaId$,
      this._store.select(selectActiveAreaId),
    ]).pipe(
      map(([currentAreaId, activeAreaId]) => currentAreaId === activeAreaId)
    );

    this.mouseClickSubject$
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this._store.dispatch(
            toggleSelectedCellIdx({ payload: this.cellIdx })
          );
        })
      )
      .subscribe();
    this.keyPress$
      .pipe(
        takeUntil(this.destroy$),
        filter((key) => key.length === 1 && key >= '1' && key <= '9'),
        map((key) => +key as Digit),
        tap((enteredDigit) => {
          this._store.dispatch(setEnteredValue({ payload: enteredDigit }));
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
