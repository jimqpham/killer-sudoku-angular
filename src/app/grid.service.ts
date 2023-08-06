import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Digit } from './state/grid.models';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  solution$: Observable<Digit[]> = of(Array(81).fill(0));
}
