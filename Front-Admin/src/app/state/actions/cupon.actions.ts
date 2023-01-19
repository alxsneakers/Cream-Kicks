import { createAction, props } from "@ngrx/store";
import { CuponModel } from "src/app/models/cupon.interface";

// accion para cargar los cupones
export const loadCoupons= createAction(
    '[Cupon List] Load coupons' // type *
)

// acccion para cuando los cupones se ha cargado
export const loadedCoupons= createAction(
    '[Cupon List] Loaded success',
    props<{coupons: CuponModel[]}>()
)

//---------------------------------
export const deleteCupon= createAction(
    '[Cupon] DeleteCupon',
    props<{id: string}>()
)

export const deleteCuponSuccess= createAction('[Cupon] DeleteCuponSuccess')

//---------------------------------

export const deleteManyCupon= createAction(
    '[Cupon] DeleteManyCuponSuccess',
    props<{idCupones: string[]}>()
)


export const deleteManyCuponSuccess= createAction('[Cupon] DeleteManyCuponSuccess')