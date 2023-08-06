export type Cell = {
    rowIdx: number;
    colIdx: number;
    entered?: number;
    solution: number;
    sameAreaWith: {
        top: boolean;
        bottom: boolean;
        left: boolean;
        right: boolean;
    }
}