import { createAction, props } from "@ngrx/store";
import { ClienteModel, CompraModel, DetalleCompraModel, PedidoModel } from "../../models/cliente.interface";


export const loadClientes= createAction('[Cliente List] Load clientes');

export const loadedClientes= createAction(
    '[Cliente List] Loaded success',
    props<{clientes: ClienteModel[]}>()
)

//----------------------------------------------

export const loadCompras= createAction(
    '[Compra List] Load compras',
    props<{id: string}>()
);

export const loadedCompras= createAction(
    '[Compra List] Loaded success',
    props<{compras: CompraModel[]}>()
)


//----------------------------------------------

export const loadDetalleCompra= createAction(
    '[Detalle Compra] Load detalle compra',
    props<{id: string}>()
)

export const loadedDetalleCompra= createAction(
    '[Detalle Compra] Loaded success',
    props<{detalleCompra: DetalleCompraModel}>()
)

//----------------------------------------------


export const loadPedidos= createAction('[Pedido] Load pedidos');

export const loadedPedidos= createAction(
    '[Pedido] Loaded success',
    props<{pedidos: PedidoModel[]}>()
)





//----------------------------------------------
export const deleteCliente= createAction(
    '[Cliente] DeleteCliente',
    props<{id: string}>()
)

export const deleteMarcaSuccess= createAction('[Cliente] DeleteClienteSuccess')

export const deleteMarcaError= createAction(
    '[Marca] DeleteClienteError',
    props<{message: string}>()
)

//----------------------------------------------
