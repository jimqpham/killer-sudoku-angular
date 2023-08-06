import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-subgrid',
  templateUrl: './subgrid.component.html',
  styleUrls: ['./subgrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubgridComponent {
  relativeCellIdx = Array(9)
    .fill(0)
    .map((_, idx) => idx);

  subgridIdxSubject$ = new BehaviorSubject<number>(0);
  subgridIdx$ = this.subgridIdxSubject$.asObservable();
  @Input()
  set subgridIdx(idx: number) {
    this.subgridIdxSubject$.next(idx);
  }
  absoluteCellIndices$: Observable<number[]>;

  constructor() {
    this.absoluteCellIndices$ = this.subgridIdx$.pipe(
      distinctUntilChanged(),
      map((subgridIdx) =>
        this.relativeCellIdx.map((relativeCellIdx) =>
          this.getAbsoluteCellIdx(subgridIdx, relativeCellIdx)
        )
      )
    );
  }

  getAbsoluteCellIdx(subgridIdx: number, relativeCellIdx: number) {
    const cellRowIdx =
      Math.floor(subgridIdx / 3) * 3 + Math.floor(relativeCellIdx / 3);
    const cellColIdx = (subgridIdx % 3) * 3 + (relativeCellIdx % 3);
    return cellRowIdx * 9 + cellColIdx;
  }
}
