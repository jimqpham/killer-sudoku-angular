import { AppState } from './grid.models';
import { selectSolutionForCellIdx } from './grid.selectors';

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
});
