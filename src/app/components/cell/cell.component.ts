import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectBridgesForCellIdx,
  selectAreaSumAtCellIdx,
  selectSolutionForCellIdx,
} from 'src/app/state/grid.selectors';
import { CellBridges } from 'src/app/types/types';
import {
  BRIDGE_WIDTH,
  CELL_PADDING,
  CELL_SIZE,
  INNER_CELL_SIZE,
} from 'src/app/utils/config';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  cellIdxSubject$ = new BehaviorSubject<number>(0);
  cellIdx$ = this.cellIdxSubject$.asObservable().pipe(distinctUntilChanged());
  @Input()
  set cellIdx(idx: number) {
    this.cellIdxSubject$.next(idx);
  }

  solution$: Observable<number>;
  bridges$: Observable<CellBridges>;
  displayAreaSum$: Observable<number | undefined>;
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
  }
}
