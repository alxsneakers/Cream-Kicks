import { createSelector } from "@ngrx/store";
import { DescuentoState } from "src/app/models/descuento.state";
import { AppState } from "../app.state";


// el selector obtiene los datos
export const selectDescuentoFeature= (state: AppState) => state.descuentos; // padre

export const selectListDescuentos= createSelector(
    selectDescuentoFeature,
    (state: DescuentoState) => state.descuentos //hijo
);

export const selectLoadingDescuentos= createSelector(
    selectDescuentoFeature,
    (state: DescuentoState) => state.loading // hijo
)