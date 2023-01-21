import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, mergeMap } from "rxjs";
import { NotificationService } from "src/app/services/notification.service";
import { DescuentoService } from "../../services/descuento.service";
import { deleteDescuento, deleteDescuentoSuccess, deleteManyDescuento, deleteManyDescuentoSuccess, loadDescuentos } from "../actions/descuento.actions";




@Injectable()
export class DescuentoEffects {


    // Se pone el simbolo del dolar($) porque es un observable. Se hace por comvencion.
    constructor(private actions$: Actions, private _descuentoService: DescuentoService, private _ntfService: NotificationService){};

  
    loadDescuentos$= createEffect(() => this.actions$.pipe(
        ofType('[Descuento List] Load descuentos'), // encargado de escuchar la accion
        mergeMap(() => this._descuentoService.listarDecuento() // retorna la data
            .pipe(
                map(descuentos => ({type: '[Descuento List] Loaded success', descuentos})),
                catchError(() => EMPTY)
            ))    
        )
    );

    deleteDescuento$= createEffect(() => this.actions$.pipe(
        ofType(deleteDescuento),
        exhaustMap((action) =>
            this._descuentoService.deleteDescuento(action.id).pipe(
                map((response) => { // todo ok
                    return deleteDescuentoSuccess()
                }),
                catchError(() => EMPTY)
                )
            )
        )
    );

     

    deleteManyDescuento$= createEffect(() => this.actions$.pipe(
        ofType(deleteManyDescuento),
        exhaustMap((action) =>
            this._descuentoService.borrarSeleccionadosDescuento(action.idDescuentos).pipe(
                map((response) => {
                    return deleteManyDescuentoSuccess()
                }),
                catchError(() => EMPTY)
            )
        )
    ));

    deleteDescuentoSucces$= createEffect(() =>
        this.actions$.pipe(
            ofType(deleteDescuentoSuccess),
            map((response) => {
                this._ntfService.openSnackBar('Descuento eliminado con exito', 'x');
                return loadDescuentos()
            })
        )
    );

    deleteManyDescuentoSuccess$= createEffect(() =>
        this.actions$.pipe(
            ofType(deleteManyDescuentoSuccess),
            map((response)=> {
                this._ntfService.openSnackBar('Descuentos eliminados con exito.', 'x');
                return loadDescuentos();
            })
        )
    );







    
}