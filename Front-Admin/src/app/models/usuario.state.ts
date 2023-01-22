import { UsuarioModel } from "./usuario.interface";



export interface UsuarioState {
    usuario: UsuarioModel;
    loading: boolean;
}