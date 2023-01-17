import { createAction, props } from "@ngrx/store";
import { ProductoModel, GaleriaModel } from "src/app/models/producto.interface";


// accion para cargar los productos
export const loadProductos= createAction(
    '[Producto List] Load productos'
)

// acccion para cuando los cupones se ha cargado
export const loadedProductos= createAction(
    '[Producto List] Loaded success',
    props<{productos: ProductoModel[]}>()
)

//-----------------------------------


export const loadGaleria= createAction(
    '[Galeria] Load galeria',
    props<{id: string}>()
);

export const loadedGaleria= createAction(
    '[Galeria] Loaded success',
    props<{galeria: GaleriaModel[]}>()
)
//-----------------------------------

export const deleteProducto= createAction(
    '[Producto] DeleteProducto',
    props<{id: string}>()
)

export const deleteProductoSuccess= createAction('[Marca] DeleteProductoSuccess')
//-----------------------------------


export const deleteImgGaleria= createAction(
    '[Galeria] DeleteImgGaleria',
    props<{id: string}>()
)

export const deleteImgGaleriaSuccess= createAction('[Galeria] DeleteImgGaleria');

//-----------------------------------


export const deleteManyImgGaleria= createAction(
    '[Galeria] DeleteManyImgGaleria',
    props<{idsGaleria: string[]}>()
)

export const deleteManyImgGaleriaSuccess= createAction('[Galeria] DeleteManyGaleriaSuccess')

//-----------------------------------

export const deleteManyProducto= createAction(
    '[Producto] DeleteManyProducto',
    props<{idsProducto: string[]}>()
)

export const deleteManyProductoSuccess= createAction('[Producto] DeleteManyProductoSuccess')

export const deleteManyProductoError= createAction(
    '[Producto] DeleteManyProductoError',
    props<{message: string}>()
)

// ---------------------------------------------

