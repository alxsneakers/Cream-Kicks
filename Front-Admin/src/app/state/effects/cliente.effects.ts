import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { type } from "os";
import { catchError, EMPTY, mergeMap, map, exhaustMap } from "rxjs";
import { ClientService } from "../../services/client.service";
import { NotificationService } from "../../services/notification.service"
import * as clienteActions from "../actions/cliente.actions";



@Injectable()
export class ClienteEffects {


    constructor(private actions$: Actions, private _clienteService: ClientService, private _ntfService: NotificationService){};

    loadClientes$= createEffect(() => this.actions$.pipe(
        ofType('[Cliente List] Load clientes'),
        mergeMap(() => this._clienteService.allClients().pipe(
            map(clientes => ({type: '[Cliente List] Loaded success', clientes})),
            catchError(() => EMPTY)
        ))
    ));


    loadCompras$= createEffect(() => this.actions$.pipe(
        ofType(clienteActions.loadCompras),
        mergeMap((action) => this._clienteService.obtener_compras_cliente(action.id).pipe(
            map(compras => ({type: '[Compra List] Loaded success', compras})),
            catchError(() => EMPTY)
        ))
    ));


    loadDetalleCompra$= createEffect(() => this.actions$.pipe(
        ofType(clienteActions.loadDetalleCompra),
        mergeMap((action) => this._clienteService.obtener_detalle_compra_cliente(action.id).pipe(
            map(detalleCompra => ({type: '[Detalle Compra] Loaded success', detalleCompra})),
            catchError(() => EMPTY)
        ))
    ))


    deleteCliente$= createEffect(() => this.actions$.pipe(
        ofType(clienteActions.deleteCliente),
        exhaustMap((action) =>
            this._clienteService.borrar_cliente_admin(action.id).pipe(
                map((response) => { // todo ok
                    this._ntfService.openSnackBar(response.message, 'x');
                    return clienteActions.loadClientes();
                }),
                catchError(() => EMPTY)
            )
        )
    ));







}