import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, mergeMap, of } from "rxjs";
import { deleteManyProducto, deleteManyProductoError, deleteManyProductoSuccess, deleteProducto, deleteProductoSuccess, loadProductos, loadGaleria, deleteImgGaleria, deleteImgGaleriaSuccess } from "../actions/producto.actions";
import { ProductService } from "../../services/product.service";
import { NotificationService } from "../../services/notification.service";

@Injectable()
export class ProductoEffects {

    constructor(private actions$: Actions, private _productService: ProductService, private _ntfService: NotificationService){};

    loadProductos$= createEffect(() => this.actions$.pipe(
        ofType('[Producto List] Load productos'), // encargado de escuchar la accion
        mergeMap(() => this._productService.allProducts() // retorna la data
            .pipe(
                map(productos => ({type: '[Producto List] Loaded success', productos})),
                catchError(() => EMPTY)
            ))    
        )
    );

    loadGaleria$= createEffect(() => this.actions$.pipe(
        ofType(loadGaleria),
        mergeMap((action) => this._productService.obtenerGaleria(action.id).pipe(
            map(galeria => ({type: '[Galeria] Loaded success', galeria})),
            catchError(() => EMPTY)
        ))
    ))

    deleteProducto$= createEffect(() => this.actions$.pipe(
        ofType(deleteProducto),
        exhaustMap((action) =>
            this._productService.deleteProduct(action.id).pipe(
                map((response) => {
                    return deleteProductoSuccess()
                }),
                catchError(() => EMPTY)
            ))
    ));

    /*deleteImgGaleria$= createEffect(() => this.actions$.pipe(
        ofType(deleteImgGaleria),
        exhaustMap((action) => 
            this._productService.eliminarImgGaleria(action.id, {_id: id}).pipe(
                map((response) => {
                    return  deleteImgGaleriaSuccess()
                }),
                catchError(() => EMPTY)
        ))
    ))*/


    deleteManyProducto$= createEffect(() => this.actions$.pipe(
        ofType(deleteManyProducto),
        exhaustMap((action) =>
            this._productService.borrarSeleccionadosProducto(action.idsProducto).pipe(
                map((response) => {
                    return deleteManyProductoSuccess()
                }),
                catchError((error) =>
                of(deleteManyProductoError({message: error})))
            )
        )
    ));


    deleteProductoSuccess$= createEffect(() => this.actions$.pipe(
        ofType(deleteProductoSuccess),
        map((response) => {
            this._ntfService.openSnackBar('Producto eliminado con exito.', 'x');
            return loadProductos();
        })
    ))


    deleteManyProductoSuccess$= createEffect(() =>
        this.actions$.pipe(
            ofType(deleteManyProductoSuccess),
            map((response)=> {
                this._ntfService.openSnackBar('Productos eliminados con exito', 'x');
                return loadProductos();
            })
        )
    );


}