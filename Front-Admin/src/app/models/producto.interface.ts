
// interfaz para listar los productos
export interface ProductoModel {
    portada: string,
    nombre: string,
    sku: string,
    marca: string,
    publicado: boolean,
    _id: string
}


export interface BestProductoModel {
    _id: string;
    nombre: string;
    portada: string;
    precioVenta: number;
}


// interfaz para crear un producto
export interface ProductCreateModel {
    nombre: string;
    marca: string;
    sku: string;
    portada: string;
    precioCompra: number;
    precioVenta: number;
    publicado: boolean;
}


export interface GaleriaModel {
    imagen: string;
    _id: string;
}