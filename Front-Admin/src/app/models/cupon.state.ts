import { CuponModel } from "./cupon.interface";

export interface CouponState{
    loading: boolean,
    coupons: ReadonlyArray<CuponModel>;
}


export interface CuponTable {
    codigo: string;
    tipo: string;
    valor: number;
    limite: number;
    index: number;
    _id: string;
  }