import { createSelector } from "@ngrx/store";
import { TallaState } from "src/app/models/talla.state";
import { AppState } from "../app.state";

export const selectTallaFeature= (state: AppState) => state.tallas;




export const selectIsLoadingCreateTalla= createSelector(
    selectTallaFeature,
    (state: TallaState) => state.loading
  );
  
  export const selectIsErrorCreateTalla= createSelector(
    selectTallaFeature,
    (state: TallaState) => state.isError
  );