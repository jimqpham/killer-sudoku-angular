import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Digit } from './state/grid.models';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  board$: Observable<{ solution: Digit[]; areas: string[] }> = of({
    solution: Array(81)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10)) as Digit[],
    areas: [
      ...['A', 'A', 'A', 'B', 'B', 'C', 'C', 'C', 'C'],
      ...['A', 'A', 'A', 'B', 'B', 'C', 'C', 'C', 'C'],
      ...['A', 'D', 'D', 'B', 'B', 'C', 'E', 'E', 'C'],
      ...['D', 'D', 'D', 'B', 'B', 'C', 'E', 'E', 'C'],
      ...['D', 'D', 'D', 'D', 'D', 'C', 'E', 'E', 'C'],
      ...['D', 'D', 'D', 'D', 'D', 'C', 'C', 'C', 'C'],
      ...['F', 'F', 'F', 'G', 'G', 'C', 'C', 'C', 'C'],
      ...['F', 'F', 'F', 'G', 'G', 'H', 'H', 'H', 'H'],
      ...['F', 'F', 'G', 'G', 'G', 'H', 'H', 'H', 'H'],
    ],
  });
}
