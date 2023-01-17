import { createReducer, on } from "@ngrx/store";
import { ProductoState } from "../../models/producto.state";
import { loadedProductos, loadProductos, deleteManyProducto, deleteManyProductoSuccess, deleteManyProductoError, deleteProducto, loadedGaleria, loadGaleria } from "../actions/producto.actions";

// estado inicial
export const initialState: ProductoState= { loading: false, loadingDelete: false, laodingGaleria: false, productos: [], galeria: [], isError: null};

// funciones reducers
export const productoReducer= createReducer(
    initialState,
    on(loadProductos, (state) =>{
        return {...state, loading: true};
    }),
    on(loadedProductos, (state, {productos}) => { // acciones
        return {...state, loading: false, productos};
    }),
    on(loadGaleria, (state) =>{
        return {...state, laodingGaleria: true};
    }),
    on(loadedGaleria, (state, {galeria}) => { // acciones
        return {...state, laodingGaleria: false, galeria};
    }),
    on(deleteProducto, (state, {id}) => {
        return {...state, id: id, loadingDelete: true, isError: null};
    }),
    on(deleteManyProductoSuccess, (state) => {
        return {...state, loadingDelete: false};
    }),
    on(deleteManyProducto, (state, {idsProducto}) => {
        return {...state, idsProducto: idsProducto, loadingDelete: true, isError: null};
    }),
    on(deleteManyProductoSuccess, (state) => {
        return {...state, loadingDelete: false};
    }),
    on(deleteManyProductoError, (state, {message}) =>{
        return {...state, loading: false, isError: message};
    })
)