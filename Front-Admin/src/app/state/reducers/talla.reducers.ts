import { createReducer, on } from "@ngrx/store";
import { TallaState } from "src/app/models/talla.state";
import { createTalla, createTallaError, createTallaSuccess } from "../actions/talla.actions";





export const initialState: TallaState= { loading: false, tallaData: null, isError: null};



export const tallaReducer= createReducer(
    initialState,
    on(createTalla, (state, {data}) =>{
        return {...state, tallaData: data, loading: true, isError: null};
    }),
    on(createTallaSuccess, (state) => {
        return {...state, loading: false};
    }),
    on(createTallaError, (state, {message}) =>{
        return {...state, loading: false, isError: message};
    })
)
