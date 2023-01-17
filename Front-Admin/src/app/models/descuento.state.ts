import { DescuentoModel } from "./descuento.interface";


export interface DescuentoState{
    loading: boolean,
    descuentos: ReadonlyArray<DescuentoModel>;
}