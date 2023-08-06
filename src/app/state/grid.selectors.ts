import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GridState } from './grid.models';

const selectGrid = createFeatureSelector<GridState>('grid');

export const selectSolution = createSelector(
  selectGrid,
  (grid) => grid.solution
);

export const selectSolutionForCellIdx = (cellIdx: number) =>
  createSelector(selectSolution, (solution) => solution[cellIdx] || 0);
