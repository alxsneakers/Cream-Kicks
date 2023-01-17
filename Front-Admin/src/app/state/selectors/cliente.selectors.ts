import { createSelector } from "@ngrx/store";
import { ClienteState } from "../../models/cliente.state";
import { AppState } from "../app.state";



export const selectClienteFeature= (state: AppState) => state.clientes;



  export const selectListClientes= createSelector(
    selectClienteFeature,
    (state: ClienteState) => state.clientes //hijo
  );
  
  export const selectLoadingClientes= createSelector(
    selectClienteFeature,
    (state: ClienteState) => state.loading // hijo
  );


  export const selectListCompras= createSelector(
    selectClienteFeature,
    (state: ClienteState) => state.compras //hijo
  );
  
  export const selectLoadingCompras= createSelector(
    selectClienteFeature,
    (state: ClienteState) => state.laodingCompras // hijo
  );


  export const selectListDetalleCompra= createSelector(
    selectClienteFeature,
    (state: ClienteState) => state.detalleCompra //hijo
  );
  
  export const selectLoadingDetalleCompra= createSelector(
    selectClienteFeature,
    (state: ClienteState) => state.loadingDetalleCompra // hijo
  );

  