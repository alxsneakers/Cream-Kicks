import { BestProductoModel, GaleriaModel, ProductoModel } from "./producto.interface";


export interface ProductoState{
    loading: boolean;
    laodingGaleria: boolean;
    loadingBestProductos: boolean;
    bestProductos: BestProductoModel[];
    productos: ReadonlyArray<ProductoModel>;
    galeria: GaleriaModel[];
    loadingDelete: boolean; 
    isError: string | null;
}