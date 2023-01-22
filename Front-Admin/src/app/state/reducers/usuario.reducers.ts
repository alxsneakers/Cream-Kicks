import { createReducer, on } from "@ngrx/store";
import { UsuarioState } from "src/app/models/usuario.state";
import { loadedUsuario, loadUsuario } from "../actions/usuario.actions";


export const initialState: UsuarioState= { loading: false, usuario: {_id: '', nombre: '', apellidos: '', email: '', telefono: ''}};



export const usuarioReducer= createReducer(
    initialState,
    on(loadUsuario, (state)=>{
        return {...state, loading: true};
    }),
    on(loadedUsuario, (state, {usuario}) => {
        return {...state, loading: false, usuario}
    })
)