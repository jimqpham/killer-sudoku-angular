import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GridState } from './grid.models';
import { CellBridges } from '../types/types';

const selectGrid = createFeatureSelector<GridState>('grid');

export const selectSolution = createSelector(
  selectGrid,
  (grid) => grid.solution
);

export const selectAreas = createSelector(selectGrid, (grid) => grid.areas);

export const selectSolutionForCellIdx = (cellIdx: number) =>
  createSelector(selectSolution, (solution) => solution[cellIdx] || 0);

export const selectAreaIdForCellIdx = (cellIdx: number) =>
  createSelector(selectAreas, (area) => area[cellIdx] || '');

export const selectBridgesForCellIdx = (cellIdx: number) =>
  createSelector(selectAreas, function (areas): CellBridges {
    const cellAboveIdx = cellIdx - 9 >= 0 ? cellIdx - 9 : undefined;
    const cellBelowIdx = cellIdx + 9 <= 80 ? cellIdx + 9 : undefined;
    const cellLeftIdx = cellIdx % 9 === 0 ? undefined : cellIdx - 1;
    const cellRightIdx = cellIdx % 9 === 8 ? undefined : cellIdx + 1;

    return {
      up: Boolean(
        cellAboveIdx !== undefined && areas[cellAboveIdx] === areas[cellIdx]
      ),
      down: Boolean(
        cellBelowIdx !== undefined && areas[cellBelowIdx] === areas[cellIdx]
      ),
      left: Boolean(
        cellLeftIdx !== undefined && areas[cellLeftIdx] === areas[cellIdx]
      ),
      right: Boolean(
        cellRightIdx !== undefined && areas[cellRightIdx] === areas[cellIdx]
      ),
    };
  });
