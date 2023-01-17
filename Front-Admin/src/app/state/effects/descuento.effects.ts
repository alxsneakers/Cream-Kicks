import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { DescuentoService } from "src/app/services/descuento.service";




@Injectable()
export class DescuentoEffects {


    // Se pone el simbolo del dolar($) porque es un observable. Se hace por comvencion.
    constructor(private actions$: Actions, private descuentoService: DescuentoService){};

  
    loadDescuentos$= createEffect(() => this.actions$.pipe(
        ofType('[Descuento List] Load descuentos'), // encargado de escuchar la accion
        mergeMap(() => this.descuentoService.listarDecuento() // retorna la data
            .pipe(
                map(descuentos => ({type: '[Descuento List] Loaded success', descuentos})),
                catchError(() => EMPTY)
            ))    
        )
    );
}