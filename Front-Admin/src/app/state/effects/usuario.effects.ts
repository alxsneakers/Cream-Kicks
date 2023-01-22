import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, merge, mergeMap } from "rxjs";
import { LoginService } from "src/app/services/login.service";
import { loadUsuario } from "../actions/usuario.actions";



@Injectable()
export class UsuarioEffects {

    constructor(private actions$: Actions, private _loginService: LoginService){};


    loadUsuario$= createEffect(() => this.actions$.pipe(
        ofType(loadUsuario),
        mergeMap((action) => this._loginService.getInfoAdmin(action.id)
        .pipe(
            map(usuario => ({type: '[Usuario] Loaded success', usuario})),
            catchError(() => EMPTY)
        ))
    ))

}