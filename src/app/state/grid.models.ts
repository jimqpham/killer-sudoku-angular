export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type OptionalDigit = Digit | undefined

export type GridState = {
    solution: Digit[]
};

export type AppState = {
    grid: GridState;
}