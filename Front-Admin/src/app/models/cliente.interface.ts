export interface ClienteModel {
    _id: string;
    nombre: string;
    apellidos: string;
    email: string;
}

export interface CompraModel {
    _id: string;
    creado: string;
    estado: string;
    subtotal: number;
}

export interface DetalleCompraModel {
    estado: string;
    creado: string;
    _id: string;
    envio_tipo: string;
    transaccion: string;
    nventa: string;
}


export interface PedidoModel {
    clienteEmail: string;
    _id: string;
    creado: string;
    estado: string;
    subtotal: number;
}