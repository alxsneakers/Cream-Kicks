import { CuponModel } from "./cupon.interface";

export interface CouponState{
    loading: boolean,
    coupons: ReadonlyArray<CuponModel>;
}