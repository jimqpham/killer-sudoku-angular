import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DrawingService } from '../drawing.service';
import { Store } from '@ngrx/store';
import { PageLoadActions } from '../state/grid.actions';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  subgridSize = `${
    this._drawingService.CONFIG.containerSize * 3 +
    this._drawingService.CONFIG.padding * 2
  }px`;
  subgridIdx = Array(9)
    .fill(0)
    .map((_, idx) => idx);

  constructor(
    private readonly _drawingService: DrawingService,
    private readonly _store: Store
  ) {}

  ngOnInit() {
    this._store.dispatch(PageLoadActions.fetchData());
  }
}
