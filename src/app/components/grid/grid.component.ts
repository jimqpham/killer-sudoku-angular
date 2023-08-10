import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageLoadActions } from '../../state/grid.actions';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  cellIndices = Array(81)
    .fill(0)
    .map((_, idx) => idx);

  constructor(private readonly _store: Store) {}

  ngOnInit() {
    this._store.dispatch(PageLoadActions.fetchData());
  }
}
