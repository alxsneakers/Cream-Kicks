import { createAction, props } from "@ngrx/store";
import { UsuarioModel } from "src/app/models/usuario.interface";



export const loadUsuario= createAction(
    '[Usuario] Loaded usuario',
    props<{id: string}>()
)

export const loadedUsuario= createAction(
    '[Usuario] Loaded success',
    props<{usuario: UsuarioModel}>()
)

