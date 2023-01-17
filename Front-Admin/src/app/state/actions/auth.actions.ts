import { createAction, props } from "@ngrx/store";
import { LoginModel, UpdateNameAccountModel, UserModel } from "src/app/models/auth.interface";


/* Resumen de las acciones 
    - Cuando el usuario se logea (inicia session)
    - Success login
    - Error login
*/


export const loginAction= createAction(
    '[Auth] LoginAction',
    props<{data: LoginModel}>()
)

export const loginSuccessAction= createAction('[Auth] LoginSuccessAction')

export const loginErrorAction= createAction(
    '[Auth] LoginErrorAction',
    props<{ message: string}>()
)

// --------------------------------------
export const loadUserInfo= createAction(
    '[Auth] Load userInfo',
    props<{id: string}>()
);


export const loadedUserInfo= createAction(
    '[Auth] Load userInfoSuccess',
    props<{userInfo: UserModel}>()
)

//--------------------------------------------------

export const cambiarNombreAccount= createAction(
    '[Auth] CambiarNombreAccount',
    props<{data: UpdateNameAccountModel}>()
)

export const cambiarNombreAccountSuccess= createAction('[Auth] CambiarNombreAccountSuccess')

export const cambiarNombreAccountError= createAction(
    '[Auth] CambiarNombreAccountError',
    props<{message: string}>()
)

//-----------------------------------------------------------

export const deleteAccount= createAction(
    '[Auth] DeleteAccount',
    props<{id: string}>()
)

export const deleteAccountSuccess= createAction('[Auth] DeleteAccountSuccess')


