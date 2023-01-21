import { ClienteModel, CompraModel, DetalleCompraModel, PedidoModel } from "./cliente.interface";

export interface ClienteState {
    clientes: ClienteModel[];
    compras: CompraModel[];
    pedidos: PedidoModel[];
    detalleCompra: DetalleCompraModel;
    loading: boolean;
    laodingCompras: boolean;
    loadingDetalleCompra: boolean;
    loadingPedidos: boolean;
}


