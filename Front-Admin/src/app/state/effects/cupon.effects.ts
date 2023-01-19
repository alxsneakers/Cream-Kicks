import { T } from "@angular/cdk/keycodes";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, mergeMap } from "rxjs";
import { CuponService } from "src/app/services/cupon.service";
import { NotificationService } from "src/app/services/notification.service";
import { deleteCupon, deleteCuponSuccess, deleteManyCupon, deleteManyCuponSuccess, loadCoupons } from "../actions/cupon.actions";


@Injectable()
export class CuponEffects {


    // Se pone el simbolo del dolar($) porque es un observable. Se hace por comvencion.
    constructor(private actions$: Actions, private cuponService: CuponService, private _ntfService: NotificationService){};


    loadCoupons$= createEffect(() => this.actions$.pipe(
        ofType('[Cupon List] Load coupons'), // encargado de escuchar la accion
        mergeMap(() => this.cuponService.allCupones() // retorna la data
            .pipe(
                map(coupons => ({type: '[Cupon List] Loaded success', coupons})),
                catchError(() => EMPTY)
            ))    
        )
    );

    deleteCupon$= createEffect(() => this.actions$.pipe(
        ofType(deleteCupon),
        exhaustMap((action) => 
            this.cuponService.borrarCupon(action.id).pipe(
                map((response) => {
                    return deleteCuponSuccess()
                }),
                catchError(() => EMPTY)
            ))
    ));

    deleteManyCupon$= createEffect(() => this.actions$.pipe(
        ofType(deleteManyCupon),
        exhaustMap((action) => 
            this.cuponService.borrarSeleccionadosCupones(action.idCupones).pipe(
                map((response) => {
                    return deleteManyCuponSuccess()
                }),
                catchError(() => EMPTY)
            ))
    ));


    deleteCuponSuccess$= createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCuponSuccess),
            map((response) => {
                this._ntfService.openSnackBar('Cupon eliminado con exito', 'x')
                return loadCoupons()
            })
    ));

    deleteManyCuponSuccess$= createEffect(() => 
        this.actions$.pipe(
            ofType(deleteManyCuponSuccess),
            map((response) => {
                this._ntfService.openSnackBar('Cupones eliminados con exito.', 'x');
                return loadCoupons();
            })
        )
    );



};



