import { createSelector } from "@ngrx/store";
import { ContactoState } from "src/app/models/contacto.state";
import { AppState } from "../app.state";

// el selector obtiene los datos
export const selectContactosFeature= (state: AppState) => state.contactos; // padre


// devuelve solo la lista de cupones
export const selectListContactos= createSelector(
    selectContactosFeature,
    (state: ContactoState) => state.contactos // hijo
);

// devuelve la variable loading
export const selectLoadingContactos= createSelector(
    selectContactosFeature,
    (state: ContactoState) => state.loading // hijo
);