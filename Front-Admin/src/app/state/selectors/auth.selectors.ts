import { createSelector } from "@ngrx/store";
import { AuthState } from "../../models/auth.state";
import { AppState } from "../app.state";


export const selectAuthFeature= (state: AppState) => state.auths; // padre


export const selectIsLoadingLogin= createSelector(
    selectAuthFeature,
    (state: AuthState) => state.isLoading
);


export const selectIsErrorLogin= createSelector(
    selectAuthFeature,
    (state: AuthState) => state.isError
);


export const selectIsLoadingCreateAdmin= createSelector(
    selectAuthFeature,
    (state: AuthState) => state.isLoadingCreateAdmin
);


export const selectIsErrorCreateAdmin= createSelector(
    selectAuthFeature,
    (state: AuthState) => state.isErrorCreateAdmin
);



export const selectIsLoadingUpdateNombre= createSelector(
    selectAuthFeature,
    (state: AuthState) => state.isLoadingCambiarNombre
);


export const selectIsErrorUpdateNombre= createSelector(
    selectAuthFeature,
    (state: AuthState) => state.isErrorUpdateName
);





