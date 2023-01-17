import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { CuponService } from "src/app/services/cupon.service";


@Injectable()
export class CuponEffects {


    // Se pone el simbolo del dolar($) porque es un observable. Se hace por comvencion.
    constructor(private actions$: Actions, private cuponService: CuponService){};


    loadCoupons$= createEffect(() => this.actions$.pipe(
        ofType('[Cupon List] Load coupons'), // encargado de escuchar la accion
        mergeMap(() => this.cuponService.allCupones() // retorna la data
            .pipe(
                map(coupons => ({type: '[Cupon List] Loaded success', coupons})),
                catchError(() => EMPTY)
            ))    
        )
    );



};



