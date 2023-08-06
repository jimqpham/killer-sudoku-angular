import { AppState } from './grid.models';
import {
  selectAreaIdForCellIdx,
  selectAreas,
  selectBridgesForCellIdx,
  selectSolutionForCellIdx,
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
      const actualSolutionValue = selectSolutionForCellIdx(cellIdx)(appState);

      // Assert
      expect(actualSolutionValue).toEqual(expectedSolutionValue);
    });

    it('should return 0 if there is no solution value', () => {
      // Arrange
      const appState = {
        grid: { solution: [1, 3, 5, 7] },
      } as AppState;
      const cellIdx = 10;
      const expectedSolutionValue = 0;

      // Act
      const actualSolutionValue = selectSolutionForCellIdx(cellIdx)(appState);

      // Assert
      expect(actualSolutionValue).toEqual(expectedSolutionValue);
    });
  });

  describe('selectAreas', () => {
    it('should return the area map', () => {
      // Arrange
      const appState = { grid: { areas: ['a', 'b', 'c'] } } as AppState;
      const expectedAreas = ['a', 'b', 'c'];

      // Act
      const actualAreas = selectAreas(appState);

      // Arrange
      expect(actualAreas).toEqual(expectedAreas);
    });
  });

  describe('selectAreaIdForCellIdx', () => {
    it('should return the area ID for the cell index', () => {
      // Arrange
      const appState = { grid: { areas: ['a', 'b', 'c'] } } as AppState;
      const cellIdx = 1;
      const expectedAreaId = 'b';

      // Act
      const actualAreaId = selectAreaIdForCellIdx(cellIdx)(appState);

      // Arrange
      expect(actualAreaId).toEqual(expectedAreaId);
    });

    it('should return an empty string if there is no area ID for the cell index', () => {
      // Arrange
      const appState = { grid: { areas: ['a', 'b', 'c'] } } as AppState;
      const cellIdx = 5;
      const expectedAreaId = '';

      // Act
      const actualAreaId = selectAreaIdForCellIdx(cellIdx)(appState);

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
      const actualTopLeftBridges = selectBridgesForCellIdx(
        SPECIAL_CELL_IDX.TOP_LEFT
      )(appState);
      const actualTopRightBridges = selectBridgesForCellIdx(
        SPECIAL_CELL_IDX.TOP_RIGHT
      )(appState);
      const actualBottomLeftBridges = selectBridgesForCellIdx(
        SPECIAL_CELL_IDX.BOTTOM_LEFT
      )(appState);
      const actualBottomRightBridges = selectBridgesForCellIdx(
        SPECIAL_CELL_IDX.BOTTOM_RIGHT
      )(appState);
      const actualCenterBridges = selectBridgesForCellIdx(
        SPECIAL_CELL_IDX.CENTER
      )(appState);

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
      const actualTopLeftBridges = selectBridgesForCellIdx(
        SPECIAL_CELL_IDX.TOP_LEFT
      )(appState);
      const actualTopRightBridges = selectBridgesForCellIdx(
        SPECIAL_CELL_IDX.TOP_RIGHT
      )(appState);
      const actualBottomLeftBridges = selectBridgesForCellIdx(
        SPECIAL_CELL_IDX.BOTTOM_LEFT
      )(appState);
      const actualBottomRightBridges = selectBridgesForCellIdx(
        SPECIAL_CELL_IDX.BOTTOM_RIGHT
      )(appState);
      const actualCenterBridges = selectBridgesForCellIdx(
        SPECIAL_CELL_IDX.CENTER
      )(appState);

      // Assert
      expect(actualTopLeftBridges).toEqual(expectedTopLeftCellBridges);
      expect(actualTopRightBridges).toEqual(expectedTopRightCellBridges);
      expect(actualBottomLeftBridges).toEqual(expectedBottomLeftCellBridges);
      expect(actualBottomRightBridges).toEqual(expectedBottomRightCellBridges);
      expect(actualCenterBridges).toEqual(expectedCenterCellBridges);
    });
  });
});
