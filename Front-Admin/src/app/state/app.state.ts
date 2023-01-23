import { ActionReducerMap } from "@ngrx/store";
// states
import { CouponState } from "../models/cupon.state";
import { DescuentoState } from "../models/descuento.state";
import { ContactoState } from "../models/contacto.state";
// reducers
import { cuponsReducer } from "./reducers/cupon.reducers";
import { descuentoReducer } from "./reducers/descuento.reducers";
import { contactoReducer } from "./reducers/contacto.reducers";
import { ProductoState } from "../models/producto.state";
import { productoReducer } from "./reducers/producto.reducers";
import { authReducer } from "./reducers/auth.reducers";
import { AuthState } from "../models/auth.state";
import { marcaReducer } from "./reducers/marca.reducers";
import { MarcaState } from "../models/marca.state";
import { ClienteState } from "../models/cliente.state";
import { clienteReducer } from "./reducers/cliente.reducers";
import { UsuarioState } from "../models/usuario.state";
import { usuarioReducer } from "./reducers/usuario.reducers";
import { TallaState } from "../models/talla.state";
import { tallaReducer } from "./reducers/talla.reducers";

export interface AppState{
    coupons: CouponState,
    descuentos: DescuentoState,
    contactos: ContactoState,
    productos: ProductoState,
    auths: AuthState,
    marcas: MarcaState,
    clientes: ClienteState,
    usuarios: UsuarioState,
    tallas: TallaState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> ={
    coupons: cuponsReducer,
    descuentos: descuentoReducer,
    contactos: contactoReducer,
    productos: productoReducer,
    auths: authReducer,
    marcas: marcaReducer,
    clientes: clienteReducer,
    usuarios: usuarioReducer,
    tallas: tallaReducer
};