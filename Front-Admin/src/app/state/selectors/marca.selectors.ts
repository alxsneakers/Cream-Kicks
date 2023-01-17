import { state } from "@angular/animations";
import { createSelector } from "@ngrx/store";
import { MarcaModel } from "src/app/models/marca.interface";
import { MarcaState } from "src/app/models/marca.state";
import { AppState } from "../app.state";


export const selectMarcaFeature= (state: AppState) => state.marcas;


export const selectListMarcas= createSelector(
  selectMarcaFeature,
  (state: MarcaState) => state.marcas //hijo
);

export const selectLoadingMarcas= createSelector(
  selectMarcaFeature,
  (state: MarcaState) => state.loading // hijo
)

export const selectIsLoadingCreateMarca= createSelector(
  selectMarcaFeature,
  (state: MarcaState) => state.loadingCreate
);

export const selectIsErrorCreateMarca= createSelector(
  selectMarcaFeature,
  (state: MarcaState) => state.isError
);

//--------------------------------

export const selectIsLoadingDeleteMarca= createSelector(
  selectMarcaFeature,
  (state: MarcaState) => state.loadingDelete
);

export const selectIsErrorDeleteMarca= createSelector(
  selectMarcaFeature,
  (state: MarcaState) => state.isError
);

//---------------------------------------------

export const selectIsLoadingDeleteManyMarcas= createSelector(
  selectMarcaFeature,
  (state: MarcaState) => state.loadingDelete
);

export const selectIsErrorDeleteManyMarcas= createSelector(
  selectMarcaFeature,
  (state: MarcaState) => state.isError
);
