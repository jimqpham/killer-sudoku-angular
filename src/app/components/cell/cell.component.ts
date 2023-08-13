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
  delay,
  distinctUntilChanged,
  filter,
  map,
  take,
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
  selectIsCorrectAnswerForCellIdx,
  selectIsUnansweredForCellIdx,
  selectIsWrongAnswerForCellIdx,
} from 'src/app/state/grid.selectors';
import { CellBridges } from 'src/app/types/types';
import {
  BRIDGE_WIDTH,
  CELL_PADDING,
  CELL_SIZE,
  INNER_CELL_SIZE,
} from 'src/app/utils/config';
import {
  resetEnteredValueWrongAnswer,
  resetSelectedCellIdxCorrectAnswer,
  setActiveArea,
  setEnteredValue,
  clickCellIdx,
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
  isZoomingIn$?: Observable<boolean>;
  mouseClickSubject$ = new Subject<void>();
  keyPressSubject$ = new ReplaySubject<string>();
  keyPress$ = this.keyPressSubject$.asObservable();
  isSelected$?: Observable<boolean>;
  isActiveArea$?: Observable<boolean>;
  isCorrectAnswer$?: Observable<boolean>;
  isWrongAnswer$?: Observable<boolean>;
  isUnanswered$?: Observable<boolean>;
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
    this.isActiveArea$ = combineLatest([
      this.areaId$,
      this._store.select(selectActiveAreaId),
    ]).pipe(
      map(([currentAreaId, activeAreaId]) => currentAreaId === activeAreaId)
    );
    this.isCorrectAnswer$ = this._store.select(
      selectIsCorrectAnswerForCellIdx[this.cellIdx]
    );
    this.isWrongAnswer$ = this._store.select(
      selectIsWrongAnswerForCellIdx[this.cellIdx]
    );
    this.isUnanswered$ = this._store.select(
      selectIsUnansweredForCellIdx[this.cellIdx]
    );
    this.isZoomingIn$ = combineLatest([
      this.isMouseOverSubject$.asObservable(),
      this.isUnanswered$,
    ]).pipe(
      map(([isMouseOver, isUnanswered]) => (isUnanswered ? isMouseOver : false))
    );

    this.mouseClickSubject$
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(this.isUnanswered$),
        filter(([_, isUnanswered]) => isUnanswered === true),
        tap(() => {
          this._store.dispatch(clickCellIdx({ payload: this.cellIdx }));
        })
      )
      .subscribe();
    this.keyPress$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        filter((key) => key.length === 1 && key >= '1' && key <= '9'),
        map((key) => +key as Digit),
        tap((enteredDigit) => {
          this._store.dispatch(
            setEnteredValue({
              payload: enteredDigit,
            })
          );
        })
      )
      .subscribe();
    this.isMouseOverSubject$
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        withLatestFrom(this.areaId$),
        tap(([isMouseOver, areaId]) => {
          if (isMouseOver) {
            this._store.dispatch(setActiveArea({ payload: areaId }));
          } else this._store.dispatch(unsetActiveArea());
        })
      )
      .subscribe();
    this.isWrongAnswer$
      .pipe(
        filter((isWrongAnswer) => isWrongAnswer === true),
        delay(600),
        tap(() => {
          this._store.dispatch(
            resetEnteredValueWrongAnswer({
              payload: this.cellIdx,
            })
          );
        })
      )
      .subscribe();
    this.isCorrectAnswer$
      .pipe(
        filter((isCorrectAnswer) => isCorrectAnswer === true),
        take(1),
        tap(() => {
          this._store.dispatch(resetSelectedCellIdxCorrectAnswer());
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
