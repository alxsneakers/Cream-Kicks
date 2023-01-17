import { GaleriaModel, ProductoModel } from "./producto.interface";


export interface ProductoState{
    loading: boolean;
    laodingGaleria: boolean;
    productos: ReadonlyArray<ProductoModel>;
    galeria: GaleriaModel[];
    loadingDelete: boolean; // lo utilizo el dos porque no se puede eliminar de dos sitios a la vez
    isError: string | null;
}