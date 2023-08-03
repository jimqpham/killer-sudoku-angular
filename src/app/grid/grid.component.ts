import { Component, OnInit } from '@angular/core';
import { DrawingService } from '../drawing.service';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Digit } from '../state/grid.models';
import { selectSolution } from '../state/grid.selectors';
import { PageLoadActions } from '../state/grid.actions';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  subgridSize = `${
    this._drawingService.CONFIG.containerSize * 3 +
    this._drawingService.CONFIG.padding * 2
  }px`;
  subgridIdx = Array(9).map((_, idx) => idx);
  solution$: Observable<Digit[]>;

  constructor(private readonly _drawingService: DrawingService, private readonly _store: Store) {
    this.solution$ = _store.select(selectSolution).pipe(tap(console.log));
  }

  ngOnInit() {
    this._store.dispatch(PageLoadActions.fetchdata());
  }
}
