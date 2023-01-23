import { createAction, props } from "@ngrx/store";
import { TallaModel } from "src/app/models/talla.interface";



export const createTalla= createAction(
    '[Talla] CreateTalla',
    props<{data: TallaModel}>()
)

export const createTallaSuccess= createAction(
    '[Talla] CreateTallaSuccess'
)

export const createTallaError= createAction(
    '[Talla] CreateTallaError',
    props<{message: string}>()
)