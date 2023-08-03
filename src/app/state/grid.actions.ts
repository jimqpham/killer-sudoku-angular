import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Digit } from "./grid.models";

export const PageLoadActions = createActionGroup({
    source: 'Page Load',
    events: {
        fetchData: emptyProps(),
        fetchDataSuccess: props<{payload: Digit[]}>(),
        fetchDataFailure: props<{payload: string}>() 
    }
})