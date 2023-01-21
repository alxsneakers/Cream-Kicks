export interface DescuentoModel {
    titulo: string;
    banner: string;
    descuento: number;
    fecha_fin: string;
    fecha_inicio: string;
    _id: string;
};


export interface DescuentoTable {
    banner: string;
    titulo: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado: string;
    descuento: number;
    index: number;
    _id: string;

}