import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ProductoState } from "../../models/producto.state";


// el selector obtiene los datos
export const selectProductoFeature= (state: AppState) => state.productos; // padre

export const selectListProductos= createSelector(
    selectProductoFeature,
    (state: ProductoState) => state.productos //hijo
);

export const selectLoadingProductos= createSelector(
    selectProductoFeature,
    (state: ProductoState) => state.loading // hijo
)

//------------------------------

export const selectListGaleria= createSelector(
  selectProductoFeature,
  (state: ProductoState) => state.galeria //hijo
);

export const selectLoadingGaleria= createSelector(
  selectProductoFeature,
  (state: ProductoState) => state.laodingGaleria // hijo
)

// -----------------------------
export const selectIsLoadingDeleteManyProducto= createSelector(
    selectProductoFeature,
    (state: ProductoState) => state.loadingDelete
  );
  
  export const selectIsErrorDeleteManyMarcas= createSelector(
    selectProductoFeature,
    (state: ProductoState) => state.isError
  );

