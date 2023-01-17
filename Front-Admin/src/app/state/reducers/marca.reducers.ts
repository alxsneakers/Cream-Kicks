import { createReducer, on } from "@ngrx/store";
import { MarcaModel } from "src/app/models/marca.interface";
import { MarcaState } from "src/app/models/marca.state";
import * as marcaActions from '../actions/marca.actions';


export const initialState: MarcaState= { loading: false, loadingCreate: false, loadingDelete: false, marcas: [], isError: null, marcaData: null };



export const marcaReducer= createReducer(
    initialState,
    on(marcaActions.loadMarcas, (state)=>{
        return {...state, loading: true};
    }),
    on(marcaActions.loadedMarcas, (state, {marcas}) => {
        return {...state, loading: false, marcas}
    }),
    on(marcaActions.createMarca, (state, {data}) =>{
        return {...state, marcaData: data, loadingCreate: true, isError: null};
    }),
    on(marcaActions.createMarcaSuccess, (state) => {
        return {...state, loadingCreate: false};
    }),
    on(marcaActions.createMarcaError, (state, {message}) =>{
        return {...state, loading: false, isError: message};
    }),
    on(marcaActions.deleteMarca, (state, {id}) => {
        return {...state, id: id, loadingDelete: true, isError: null};
    }),
    on(marcaActions.deleteMarcaSuccess, (state) => {
        return {...state, loadingDelete: false};
    }),
    on(marcaActions.deleteMarcaError, (state, {message}) =>{
        return {...state, loading: false, isError: message};
    }),
    on(marcaActions.deleteManyMarca, (state, {idsMarcas}) => {
        return {...state, idsMarcas: idsMarcas, loadingDelete: true, isError: null};
    }),
    on(marcaActions.deleteManyMarcaSuccess, (state) => {
        return {...state, loadingDelete: false};
    }),
    on(marcaActions.deleteManyMarcaError, (state, {message}) =>{
        return {...state, loading: false, isError: message};
    })
)






