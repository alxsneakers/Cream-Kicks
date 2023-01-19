import { createReducer, on } from "@ngrx/store";
import { CouponState } from "src/app/models/cupon.state";
import { deleteCupon, deleteCuponSuccess, deleteManyCupon, deleteManyCuponSuccess, loadCoupons, loadedCoupons } from "../actions/cupon.actions";


/* ESTADO INICIAL
    "coupons": { --> (Padre)
        "loading" : "false",  --> (Hijo)
        "coupons" : [    --> (Hijo)
            {
                "codigo": "",
                "tipo": "",
                "valor": "",
                "limite": 0
            },
            etc....
        ]
    }
*/
export const initialState: CouponState = { loading: false, coupons: [] }


// funciones reducers
export const cuponsReducer= createReducer(
    initialState,
    on(loadCoupons, (state) => { // acciones
        return {...state, loading: true};
    }),
    on(loadedCoupons, (state, {coupons}) => { // acciones
        return {...state, loading: false, coupons};
    }),
    on(deleteCupon, (state, {id}) => {
        return {...state, id: id};
    }),
    on(deleteCuponSuccess, (state) => {
        return {...state};
    }),
    on(deleteManyCupon, (state, {idCupones}) => {
        return {...state, idCupones: idCupones};
    }),
    on(deleteManyCuponSuccess, (state) => {
        return {...state};
    }),
)