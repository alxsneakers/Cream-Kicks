import { createAction, props } from "@ngrx/store";
import { MarcaModel } from "src/app/models/marca.interface";




export const loadMarcas= createAction(
    '[Marca List] Load marcas'
)

export const loadedMarcas= createAction(
    '[Marca List] Loaded success',
    props<{marcas: MarcaModel[]}>()
)


export const createMarca= createAction(
    '[Marca] CreateMarca',
    props<{data: MarcaModel}>()
)

export const createMarcaSuccess= createAction(
    '[Marca] CreateMarcaSuccess'
)

export const createMarcaError= createAction(
    '[Marca] CreateMarcaError',
    props<{message: string}>()
)

//------------------------------------------------------------------------

export const deleteMarca= createAction(
    '[Marca] DeleteMarca',
    props<{id: string}>()
)

export const deleteMarcaSuccess= createAction('[Marca] DeleteMarcaSuccess')

export const deleteMarcaError= createAction(
    '[Marca] DeleteMarcaError',
    props<{message: string}>()
)


//---------------------------------

export const deleteManyMarca= createAction(
    '[Marca] DeleteManyMarca',
    props<{idsMarcas: string[]}>()
)

export const deleteManyMarcaSuccess= createAction('[Marca] DeleteManyMarcaSuccess')

export const deleteManyMarcaError= createAction(
    '[Marca] DeleteManyMarcaError',
    props<{message: string}>()
)





