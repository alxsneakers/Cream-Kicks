import { createSelector } from "@ngrx/store";
import { UsuarioState } from "src/app/models/usuario.state";
import { AppState } from "../app.state";



export const selectUsuarioFeature= (state: AppState) => state.usuarios;




export const selectListUsuario= createSelector(
    selectUsuarioFeature,
    (state: UsuarioState) => state.usuario //hijo
  );
  
  export const selectLoadingUsuario= createSelector(
    selectUsuarioFeature,
    (state: UsuarioState) => state.loading // hijo
  );