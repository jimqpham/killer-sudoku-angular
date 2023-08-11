import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GridState } from './grid.models';
import { AreaProps, CellBridges } from '../types/types';

const selectGrid = createFeatureSelector<GridState>('grid');

const selectSolutionMemoized = createSelector(
  selectGrid,
  (grid) => grid.solution
);

const selectEnteredValuesMemoized = createSelector(
  selectGrid,
  (grid) => grid.enteredValue
);

const selectAreasMemoized = createSelector(selectGrid, (grid) => grid.areas);

const selectActiveAreaIdMemoized = createSelector(
  selectGrid,
  (grid) => grid.activeArea
);

const selectSelectedCellIdxMemoized = createSelector(
  selectGrid,
  (grid) => grid.selectedCellIdx
);

export const selectActiveAreaId = createSelector(
  selectActiveAreaIdMemoized,
  (activeArea) => activeArea
);

export const selectSolutionForCellIdx = (cellIdx: number) =>
  createSelector(selectSolutionMemoized, (solution) => solution[cellIdx] || 0);

export const selectEnteredValueForCellIdx = (cellIdx: number) =>
  createSelector(
    selectEnteredValuesMemoized,
    (enteredValues) => enteredValues[cellIdx]
  );

export const selectAreaIdForCellIdx = (cellIdx: number) =>
  createSelector(selectAreasMemoized, (area) => area[cellIdx] || '');

export const selectBridgesForCellIdx = (cellIdx: number) =>
  createSelector(selectAreasMemoized, function (areas): CellBridges {
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

export const selectAreaProps = createSelector(
  selectAreasMemoized,
  selectSolutionMemoized,
  function (areas, solution): AreaProps[] {
    let areaPropsList = [] as AreaProps[];

    areas.forEach((currentArea, currentIdx) => {
      const areaPropsListItem = areaPropsList.find(
        (areaItem) => areaItem.areaId === currentArea
      );

      if (areaPropsListItem === undefined)
        areaPropsList = [
          ...areaPropsList,
          {
            areaId: currentArea,
            sum: solution[currentIdx],
            topLeftCellIdx: currentIdx,
          },
        ];
      else {
        areaPropsListItem.sum += solution[currentIdx];
      }
    });

    return areaPropsList;
  }
);

export const selectAreaSumAtCellIdx = (cellIdx: number) =>
  createSelector(
    selectAreasMemoized,
    selectAreaProps,
    (areas, areaPropsList) =>
      areaPropsList.find(
        (areaProps) =>
          areaProps.areaId === areas[cellIdx] &&
          areaProps.topLeftCellIdx === cellIdx
      )?.sum
  );

export const selectSelectedCellIdx = createSelector(
  selectSelectedCellIdxMemoized,
  (selectedCellIdx) => selectedCellIdx
);
