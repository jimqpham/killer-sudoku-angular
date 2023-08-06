import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DrawingService } from '../drawing.service';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSolutionForCellIdx } from '../state/grid.selectors';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  cellSize = this._drawingService.CONFIG.cellSize;
  containerSize = this._drawingService.CONFIG.containerSize;
  roundedBorder = this._drawingService.CONFIG.roundedBorder;

  cellIdxSubject$ = new BehaviorSubject<number>(0);
  cellIdx$ = this.cellIdxSubject$.asObservable();
  @Input()
  set cellIdx(idx: number) {
    this.cellIdxSubject$.next(idx);
  }

  solution$: Observable<number>;

  constructor(
    private readonly _drawingService: DrawingService,
    private readonly _store: Store
  ) {
    this.solution$ = this.cellIdx$.pipe(
      distinctUntilChanged(),
      switchMap((cellIdx) => _store.select(selectSolutionForCellIdx(cellIdx)))
    );
  }
}
