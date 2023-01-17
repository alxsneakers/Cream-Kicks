import { createReducer, on } from "@ngrx/store";
import { ClienteState } from "../../models/cliente.state";
import { loadClientes, loadedClientes, deleteCliente, loadCompras, loadedCompras, loadedDetalleCompra, loadDetalleCompra } from "../actions/cliente.actions";

export const initialState: ClienteState= { loading: false,laodingCompras: false, loadingDetalleCompra: false, clientes: [], compras: [], detalleCompra: {estado: '', creado: '', _id: '', envio_tipo: '', transaccion: '', nventa: ''}};



export const clienteReducer= createReducer(
    initialState,
    on(loadClientes, (state)=>{
        return {...state, loading: true};
    }),
    on(loadedClientes, (state, {clientes}) => {
        return {...state, loading: false, clientes}
    }),
    on(loadCompras, (state)=>{
        return {...state, laodingCompras: true};
    }),
    on(loadedCompras, (state, {compras}) => {
        return {...state, laodingCompras: false, compras}
    }),
    on(loadDetalleCompra, (state)=>{
        return {...state, loadingDetalleCompra: true};
    }),
    on(loadedDetalleCompra, (state, {detalleCompra}) => {
        return {...state, loadingDetalleCompra: false, detalleCompra}
    }),
    on(deleteCliente, (state, {id}) => {
        return {...state, id: id};
    })
)

