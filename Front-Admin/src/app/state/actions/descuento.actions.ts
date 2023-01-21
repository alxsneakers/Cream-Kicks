import { createAction, props } from "@ngrx/store";
import { DescuentoModel } from "src/app/models/descuento.interface";


// accion para cargar los descuentos
export const loadDescuentos= createAction(
    '[Descuento List] Load descuentos'
)

// acccion para cuando los cupones se ha cargado
export const loadedDescuentos= createAction(
    '[Descuento List] Loaded success',
    props<{descuentos: DescuentoModel[]}>()
)

//---------------------------------

export const deleteDescuento= createAction(
    '[Descuento] DeleteDescuento',
    props<{id: string}>()
)

export const deleteDescuentoSuccess= createAction('[Descuento] DeleteDescuentoSuccess')


//---------------------------------

export const deleteManyDescuento= createAction(
    '[Descuento] DeleteManyDescuento',
    props<{idDescuentos: string[]}>()
)

export const deleteManyDescuentoSuccess= createAction('[Descuento] DeleteManyDescuentoSuccess')
