import { createReducer, on } from "@ngrx/store";
import { AuthState } from "../../models/auth.state";
import * as authActions from '../actions/auth.actions';
import { UserModel } from "../../models/auth.interface";




export const initialState: AuthState = {
    loginData: null,
    updateNameAccount: null,
    isLoading: false,
    isLoadingCambiarNombre: false,
    isError: null,
    isErrorUpdateName: null,
    userInfo: {},
    loadingUserInfo: false
}


export const authReducer= createReducer(
    initialState,
    on(authActions.loginAction, (state, {data}) =>{
        return {...state, loginData: data, isLoading: true, isError: null};
    }),
    on(authActions.loginSuccessAction, (state) => {
        return {...state, isLoading: false};
    }),
    on(authActions.loginErrorAction, (state, {message}) => {
        return {...state, isLoading: false, isError: message};
    }),
    on(authActions.deleteAccount, (state, {id}) =>{
        return {...state, id: id, isLoading: true, isError: null};
    }),
    on(authActions.deleteAccountSuccess, (state) => {
        return {...state, isLoading: false};
    }),
    on(authActions.cambiarNombreAccount, (state, {data}) =>{
        return {...state, updateNameAccount: data, isLoadingCambiarNombre: true, isErrorUpdateName: null};
    }),
    on(authActions.cambiarNombreAccountSuccess, (state) => {
        return {...state, isLoadingCambiarNombre: false};
    }),
    on(authActions.cambiarNombreAccountError, (state, {message}) => {
        return {...state, isLoadingCambiarNombre: false, isErrorUpdateName: message};
    }),
    on(authActions.loadUserInfo, (state) =>{
        return {...state, loadingUserInfo: true};
    }),
    on(authActions.loadedUserInfo, (state, {userInfo}) => { // acciones
        return {...state, loadingUserInfo: false, userInfo};
    })
)