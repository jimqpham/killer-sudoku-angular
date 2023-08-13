export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type OptionalDigit = Digit | undefined;

export type GridState = {
  solution: Digit[];
  areas: string[];
  enteredValue: (Digit | undefined)[];
  activeArea?: string;
  selectedCellIdx?: number;
};

export type AppState = {
  grid: GridState;
};
