import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, EMPTY, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { MarcaService } from "src/app/services/marca.service";
import { NotificationService } from "src/app/services/notification.service";
import * as marcaActions from '../actions/marca.actions';


@Injectable()
export class MarcaEffects {

    constructor(private actions$: Actions, private _marcaService: MarcaService, private _ntfService: NotificationService){};



    loadMarcas$= createEffect(() => this.actions$.pipe(
        ofType('[Marca List] Load marcas'),
        mergeMap(() => this._marcaService.allMarcas()
        .pipe(
            map(marcas => ({type: '[Marca List] Loaded success', marcas})),
            catchError(() => EMPTY)
        ))
    ))


    createMarca$= createEffect(() => this.actions$.pipe(
        ofType(marcaActions.createMarca),
        exhaustMap((action) =>
            this._marcaService.createMarca(action.data).pipe(
                map((response) =>{ // todo ok
                    return marcaActions.createMarcaSuccess()
                }),
                catchError((error) => // mando el error que me da el backend
                    of(marcaActions.createMarcaError({message: error.error.message}))
                )
            )
        )
    ));


    deleteMarca$= createEffect(() => this.actions$.pipe(
        ofType(marcaActions.deleteMarca),
        exhaustMap((action) =>
            this._marcaService.borrarMarca(action.id).pipe(
                map((response) => { // todo ok
                    return marcaActions.deleteMarcaSuccess()
                }),
                catchError((error) =>
                    of(marcaActions.deleteMarcaError({message: error}))
                )
            )
        )
    ));


    deleteManyMarcas$= createEffect(() => this.actions$.pipe(
        ofType(marcaActions.deleteManyMarca),
        exhaustMap((action) =>
            this._marcaService.borrarSeleccionadosMarca(action.idsMarcas).pipe(
                map((response) => {
                    return marcaActions.deleteManyMarcaSuccess()
                }),
                catchError((error) =>
                    of(marcaActions.deleteManyMarcaError({message: error}))
                )
            )
        )
    ));

    


    // si la creacion de la marca es correcta, le envio una notificacion y vuelvo a cargar los datos
    createMarcaSuccess$= createEffect(() =>
        this.actions$.pipe(
            ofType(marcaActions.createMarcaSuccess),
            map((response) => {
                this._ntfService.openSnackBar('Marca creada con exito', 'x');
                return marcaActions.loadMarcas()
            })
        )
    );

    deleteMarcaSucces$= createEffect(() =>
        this.actions$.pipe(
            ofType(marcaActions.deleteMarcaSuccess),
            map((response) => {
                this._ntfService.openSnackBar('Marca eliminada con exito', 'x');
                return marcaActions.loadMarcas()
            })
        )
    );


    deleteManyMarcaSuccess$= createEffect(() =>
        this.actions$.pipe(
            ofType(marcaActions.deleteManyMarcaSuccess),
            map((response)=> {
                this._ntfService.openSnackBar('Marcas eliminadas con exito', 'x');
                return marcaActions.loadMarcas();
            })
        )
    );



    

    

    




}


