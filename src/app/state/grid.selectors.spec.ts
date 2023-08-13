import { AreaProps } from '../types/types';
import { AppState } from './grid.models';
import {
  selectAreaIdForCellIdx,
  selectAreaProps,
  selectBridgesForCellIdx,
  selectAreaSumAtCellIdx,
  selectSolutionForCellIdx,
  selectActiveAreaId,
  selectSelectedCellIdx,
  selectEnteredValueForCellIdx,
} from './grid.selectors';

const SPECIAL_CELL_IDX = {
  TOP_LEFT: 0,
  TOP_RIGHT: 8,
  BOTTOM_LEFT: 72,
  BOTTOM_RIGHT: 80,
  CENTER: 40,
};

describe('Grid Selectors', () => {
  describe('selectSolutionForCellIdx', () => {
    it('should return the solution value corresponding to the cell index', () => {
      // Arrange
      const appState = {
        grid: { solution: [1, 3, 5, 7] },
      } as AppState;
      const cellIdx = 1;
      const expectedSolutionValue = 3;

      // Act
      const actualSolutionValue = selectSolutionForCellIdx[cellIdx](appState);

      // Assert
      expect(actualSolutionValue).toEqual(expectedSolutionValue);
    });

    it('should return undefined if there is no solution value', () => {
      // Arrange
      const appState = {
        grid: { solution: [1, 3, 5, 7] },
      } as AppState;
      const cellIdx = 10;

      // Act
      const actualSolutionValue = selectSolutionForCellIdx[cellIdx](appState);

      // Assert
      expect(actualSolutionValue).toBeUndefined();
    });
  });

  describe('selectActiveAreaId', () => {
    it('should return the current active area id', () => {
      // Arrange
      const activeAreaId = 'ACTIVE';
      const appState = { grid: { activeArea: activeAreaId } } as AppState;

      expect(selectActiveAreaId(appState)).toEqual(activeAreaId);
    });
  });

  describe('selectSelectedCellIdx', () => {
    it('should return the current selected cell index', () => {
      // Arrange
      const selectedCellIdx = 10;
      const appState = { grid: { selectedCellIdx } } as AppState;

      expect(selectSelectedCellIdx(appState)).toEqual(selectedCellIdx);
    });
  });

  describe('selectEnteredValueForCellIdx', () => {
    it('should return the entered value for the cell index', () => {
      const appState = { grid: { enteredValue: [2, 3, 4, 5] } } as AppState;

      expect(selectEnteredValueForCellIdx[3](appState)).toEqual(5);
    });
  });

  describe('selectAreaIdForCellIdx', () => {
    it('should return the area ID for the cell index', () => {
      // Arrange
      const appState = { grid: { areas: ['a', 'b', 'c'] } } as AppState;
      const cellIdx = 1;
      const expectedAreaId = 'b';

      // Act
      const actualAreaId = selectAreaIdForCellIdx[cellIdx](appState);

      // Arrange
      expect(actualAreaId).toEqual(expectedAreaId);
    });

    it('should return an empty string if there is no area ID for the cell index', () => {
      // Arrange
      const appState = { grid: { areas: ['a', 'b', 'c'] } } as AppState;
      const cellIdx = 5;
      const expectedAreaId = '';

      // Act
      const actualAreaId = selectAreaIdForCellIdx[cellIdx](appState);

      // Arrange
      expect(actualAreaId).toEqual(expectedAreaId);
    });
  });

  describe('selectBridgesForCellIdx', () => {
    it('scenario 1: every row is a separate area', () => {
      // Arrange
      const areaMap = [
        ...Array(9).fill('A'),
        ...Array(9).fill('B'),
        ...Array(9).fill('C'),
        ...Array(9).fill('D'),
        ...Array(9).fill('E'),
        ...Array(9).fill('F'),
        ...Array(9).fill('G'),
        ...Array(9).fill('H'),
        ...Array(9).fill('I'),
      ];
      const appState = { grid: { areas: areaMap } } as AppState;
      const expectedTopLeftCellBridges = {
        up: false,
        down: false,
        left: false,
        right: true,
      };
      const expectedTopRightCellBridges = {
        up: false,
        down: false,
        left: true,
        right: false,
      };
      const expectedBottomLeftCellBridges = {
        up: false,
        down: false,
        left: false,
        right: true,
      };
      const expectedBottomRightCellBridges = {
        up: false,
        down: false,
        left: true,
        right: false,
      };
      const expectedCenterCellBridges = {
        up: false,
        down: false,
        left: true,
        right: true,
      };

      // Act
      const actualTopLeftBridges =
        selectBridgesForCellIdx[SPECIAL_CELL_IDX.TOP_LEFT](appState);
      const actualTopRightBridges =
        selectBridgesForCellIdx[SPECIAL_CELL_IDX.TOP_RIGHT](appState);
      const actualBottomLeftBridges =
        selectBridgesForCellIdx[SPECIAL_CELL_IDX.BOTTOM_LEFT](appState);
      const actualBottomRightBridges =
        selectBridgesForCellIdx[SPECIAL_CELL_IDX.BOTTOM_RIGHT](appState);
      const actualCenterBridges =
        selectBridgesForCellIdx[SPECIAL_CELL_IDX.CENTER](appState);

      // Assert
      expect(actualTopLeftBridges).toEqual(expectedTopLeftCellBridges);
      expect(actualTopRightBridges).toEqual(expectedTopRightCellBridges);
      expect(actualBottomLeftBridges).toEqual(expectedBottomLeftCellBridges);
      expect(actualBottomRightBridges).toEqual(expectedBottomRightCellBridges);
      expect(actualCenterBridges).toEqual(expectedCenterCellBridges);
    });

    it('scenario 2: every column is a separate area', () => {
      // Arrange
      const areaMap = Array(9)
        .fill(null)
        .flatMap(() => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
      const appState = { grid: { areas: areaMap } } as AppState;
      const expectedTopLeftCellBridges = {
        up: false,
        down: true,
        left: false,
        right: false,
      };
      const expectedTopRightCellBridges = {
        up: false,
        down: true,
        left: false,
        right: false,
      };
      const expectedBottomLeftCellBridges = {
        up: true,
        down: false,
        left: false,
        right: false,
      };
      const expectedBottomRightCellBridges = {
        up: true,
        down: false,
        left: false,
        right: false,
      };
      const expectedCenterCellBridges = {
        up: true,
        down: true,
        left: false,
        right: false,
      };

      // Act
      const actualTopLeftBridges =
        selectBridgesForCellIdx[SPECIAL_CELL_IDX.TOP_LEFT](appState);
      const actualTopRightBridges =
        selectBridgesForCellIdx[SPECIAL_CELL_IDX.TOP_RIGHT](appState);
      const actualBottomLeftBridges =
        selectBridgesForCellIdx[SPECIAL_CELL_IDX.BOTTOM_LEFT](appState);
      const actualBottomRightBridges =
        selectBridgesForCellIdx[SPECIAL_CELL_IDX.BOTTOM_RIGHT](appState);
      const actualCenterBridges =
        selectBridgesForCellIdx[SPECIAL_CELL_IDX.CENTER](appState);

      // Assert
      expect(actualTopLeftBridges).toEqual(expectedTopLeftCellBridges);
      expect(actualTopRightBridges).toEqual(expectedTopRightCellBridges);
      expect(actualBottomLeftBridges).toEqual(expectedBottomLeftCellBridges);
      expect(actualBottomRightBridges).toEqual(expectedBottomRightCellBridges);
      expect(actualCenterBridges).toEqual(expectedCenterCellBridges);
    });
  });

  describe('selectAreaProps', () => {
    it('scenario 1: every row is a separate area', () => {
      // Arrange
      const areaMap = [
        ...Array(9).fill('A'),
        ...Array(9).fill('B'),
        ...Array(9).fill('C'),
        ...Array(9).fill('D'),
        ...Array(9).fill('E'),
        ...Array(9).fill('F'),
        ...Array(9).fill('G'),
        ...Array(9).fill('H'),
        ...Array(9).fill('I'),
      ];
      const solution = [
        ...Array(9).fill(1),
        ...Array(9).fill(2),
        ...Array(9).fill(3),
        ...Array(9).fill(4),
        ...Array(9).fill(5),
        ...Array(9).fill(6),
        ...Array(9).fill(7),
        ...Array(9).fill(8),
        ...Array(9).fill(9),
      ];
      const appState = { grid: { solution, areas: areaMap } } as AppState;
      const expectedAreaProps: AreaProps[] = [
        { areaId: 'A', topLeftCellIdx: 0, sum: 9 },
        { areaId: 'B', topLeftCellIdx: 9, sum: 18 },
        { areaId: 'C', topLeftCellIdx: 18, sum: 27 },
        { areaId: 'D', topLeftCellIdx: 27, sum: 36 },
        { areaId: 'E', topLeftCellIdx: 36, sum: 45 },
        { areaId: 'F', topLeftCellIdx: 45, sum: 54 },
        { areaId: 'G', topLeftCellIdx: 54, sum: 63 },
        { areaId: 'H', topLeftCellIdx: 63, sum: 72 },
        { areaId: 'I', topLeftCellIdx: 72, sum: 81 },
      ];

      // Act
      const actualAreaProps = selectAreaProps(appState);

      // Assert
      expect(actualAreaProps).toEqual(expectedAreaProps);
    });

    it('scenario 2: every column is a separate area', () => {
      // Arrange
      const areaMap = Array(9)
        .fill(null)
        .flatMap(() => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
      const solution = [
        ...Array(9).fill(1),
        ...Array(9).fill(2),
        ...Array(9).fill(3),
        ...Array(9).fill(4),
        ...Array(9).fill(5),
        ...Array(9).fill(6),
        ...Array(9).fill(7),
        ...Array(9).fill(8),
        ...Array(9).fill(9),
      ];
      const appState = { grid: { solution, areas: areaMap } } as AppState;
      const expectedAreaProps: AreaProps[] = [
        {
          areaId: 'A',
          topLeftCellIdx: 0,
          sum: 45,
        },
        {
          areaId: 'B',
          topLeftCellIdx: 1,
          sum: 45,
        },
        {
          areaId: 'C',
          topLeftCellIdx: 2,
          sum: 45,
        },
        {
          areaId: 'D',
          topLeftCellIdx: 3,
          sum: 45,
        },
        {
          areaId: 'E',
          topLeftCellIdx: 4,
          sum: 45,
        },
        {
          areaId: 'F',
          topLeftCellIdx: 5,
          sum: 45,
        },
        {
          areaId: 'G',
          topLeftCellIdx: 6,
          sum: 45,
        },
        {
          areaId: 'H',
          topLeftCellIdx: 7,
          sum: 45,
        },
        {
          areaId: 'I',
          topLeftCellIdx: 8,
          sum: 45,
        },
      ];

      // Act
      const actualAreaProps = selectAreaProps(appState);

      // Assert
      expect(actualAreaProps).toEqual(expectedAreaProps);
    });
  });

  describe('selectDisplayAreaSum', () => {
    describe('scenario: when each row is a separate area', () => {
      // Arrange
      const areaMap = [
        ...Array(9).fill('A'),
        ...Array(9).fill('B'),
        ...Array(9).fill('C'),
        ...Array(9).fill('D'),
        ...Array(9).fill('E'),
        ...Array(9).fill('F'),
        ...Array(9).fill('G'),
        ...Array(9).fill('H'),
        ...Array(9).fill('I'),
      ];
      const solution = [
        ...Array(9).fill(1),
        ...Array(9).fill(2),
        ...Array(9).fill(3),
        ...Array(9).fill(4),
        ...Array(9).fill(5),
        ...Array(9).fill(6),
        ...Array(9).fill(7),
        ...Array(9).fill(8),
        ...Array(9).fill(9),
      ];
      const appState = { grid: { solution, areas: areaMap } } as AppState;

      it('should return the area sum number if the cell is the top left cell of the area', () => {
        const cellIdx = 18; // the 1st cell of row 2, also the top left cell of that area (1 row = 1 area in this case)
        const expectedAreaSum = 27; // the row has 9 cells, of each of which the value is 3

        // Act
        const actualAreaSum = selectAreaSumAtCellIdx[cellIdx](appState);

        // Assert
        expect(actualAreaSum).toEqual(expectedAreaSum);
      });

      it('should return undefined if the cell is NOT the top left cell of the area', () => {
        const cellIdx = 12; // the 2nd cell of row 2, so NOT the top left cell of that area

        // Act
        const actualAreaSum = selectAreaSumAtCellIdx[cellIdx](appState);

        // Assert
        expect(actualAreaSum).toBeUndefined();
      });
    });
  });
});
