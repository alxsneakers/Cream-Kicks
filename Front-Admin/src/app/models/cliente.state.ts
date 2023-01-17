import { ClienteModel, CompraModel, DetalleCompraModel } from "./cliente.interface";

export interface ClienteState {
    clientes: ClienteModel[];
    compras: CompraModel[];
    detalleCompra: DetalleCompraModel;
    loading: boolean;
    laodingCompras: boolean;
    loadingDetalleCompra: boolean;
}


