import { createReducer, on } from "@ngrx/store";
import { ContactoState } from "src/app/models/contacto.state";
import { loadContactos, loadedContactos } from "../actions/contacto.actions";


export const initialState: ContactoState = { loading: false, contactos: [] }


// funciones reducers
export const contactoReducer= createReducer(
    initialState,
    on(loadContactos, (state) =>{
        return {...state, loading: true};
    }),
    on(loadedContactos, (state, {contactos}) => { // acciones
        return {...state, loading: false, contactos};
    })
)