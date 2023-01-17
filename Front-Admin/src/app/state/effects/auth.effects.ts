import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { LoginService } from "../../services/login.service";
import * as authActions from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private _loginService: LoginService, private _router: Router, private _ntfService: NotificationService){};



    login$= createEffect(() => this.actions$.pipe(
        ofType(authActions.loginAction),
        exhaustMap((action) =>
            this._loginService.login_admin(action.data).pipe(
                map((response) =>{ // todo ok
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('id', response._id)
                    return authActions.loginSuccessAction();
                }),
                catchError((error) =>
                    of( authActions.loginErrorAction({message: error.error.error}))
                )
            )
        )
    ));

    loadUserInfo$= createEffect(() => this.actions$.pipe(
        ofType(authActions.loadUserInfo),
        mergeMap((action) => this._loginService.getInfoAdmin(action.id).pipe(
            map(info => ({type: '[Auth] Load userInfoSuccess', info})),
            catchError(() => EMPTY)
        ))
    ))


    deleteAccount$= createEffect(() => this.actions$.pipe(
        ofType(authActions.deleteAccount),
        exhaustMap((action) => 
            this._loginService.borrar_cuenta_admin(action.id).pipe(
                map((response) => {
                    return authActions.deleteAccountSuccess();
                })
            )
        )
    ));

    cambiarNombreAccount$= createEffect(() => this.actions$.pipe(
        ofType(authActions.cambiarNombreAccount),
        exhaustMap((action) =>
            this._loginService.actualizar_nombre_admin(action.data).pipe(
                map((response) => {
                    return authActions.cambiarNombreAccountSuccess();
                }),
                catchError((error) => 
                    of(authActions.cambiarNombreAccountError({message: error.error.error})))
            )
        )
    ));

    // si el login es correcto, redirige a la home page
    loginSuccess$= createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.loginSuccessAction),
            tap(() => { // se pone tap, porque este efecto no retorna una accion
                this._router.navigate(['/dashboard']);
            })
        ),
        {dispatch: false}
    );


    cambiarNomrbeAccountSuccess$= createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.cambiarNombreAccountSuccess),
            tap(() => {
                this._ntfService.openSnackBar('Nombre actualizado correctamente.', 'x');
            })
        ),
        {dispatch: false}
    );


    deleteAccountSuccess$= createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.deleteAccountSuccess),
            tap(() =>{
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                this._router.navigate(['/']);
            })
        ),
        {dispatch: false}
    );



}