import { createReducer, on } from "@ngrx/store";
import { DescuentoState } from "src/app/models/descuento.state";
import { deleteDescuento, deleteManyDescuento, loadDescuentos, loadedDescuentos } from "../actions/descuento.actions";



// estado inicial
export const initialState: DescuentoState= { loading: false, descuentos: []};

// funciones reducers
export const descuentoReducer= createReducer(
    initialState,
    on(loadDescuentos, (state) =>{
        return {...state, loading: true};
    }),
    on(loadedDescuentos, (state, {descuentos}) => { // acciones
        return {...state, loading: false, descuentos};
    }),
    on(deleteDescuento, (state, {id}) => {
        return {...state, id: id};
    }),
    on(deleteManyDescuento, (state, {idDescuentos}) => {
        return {...state, idDescuentos: idDescuentos };
    }),
)