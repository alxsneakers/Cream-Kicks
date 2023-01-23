import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TallaService } from "src/app/services/talla.service";
import { NotificationService } from "src/app/services/notification.service";
import { createTalla, createTallaError, createTallaSuccess } from "../actions/talla.actions";
import { exhaustMap, map, of, catchError, tap } from "rxjs";





@Injectable()
export class TallaEffects {

    constructor(private actions$: Actions, private _tallaService: TallaService, private _ntfService: NotificationService){};


    createTalla$= createEffect(() => this.actions$.pipe(
        ofType(createTalla),
        exhaustMap((action) =>
            this._tallaService.createTalla(action.data).pipe(
                map(() =>{ // todo ok
                    return createTallaSuccess();
                }),
                catchError((error) => // mando el error que me da el backend
                    of(createTallaError({message: error.error.message}))
                )
            )
        )
    ));

     // si la creacion de la marca es correcta, le envio una notificacion y vuelvo a cargar los datos
     createTallaSuccess$= createEffect(() =>
     this.actions$.pipe(
         ofType(createTallaSuccess),
         tap(() => {
             this._ntfService.openSnackBar('Talla creada con exito', 'x');
         })
     )
 );



}