import { createSelector } from "@ngrx/store";
import { CouponState } from "src/app/models/cupon.state";
import { AppState } from "../app.state";

// el selector obtiene los datos
export const selectCouponsFeature= (state: AppState) => state.coupons; // padre


// devuelve solo la lista de cupones
export const selectListItems= createSelector(
    selectCouponsFeature,
    (state: CouponState) => state.coupons // hijo
);

// devuelve la variable loading
export const selectLoading= createSelector(
    selectCouponsFeature,
    (state: CouponState) => state.loading // hijo
);