import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GridState } from "./grid.models";

const selectGrid = createFeatureSelector<GridState>('grid');

export const selectSolution = createSelector(
    selectGrid,
    grid => grid.solution
)