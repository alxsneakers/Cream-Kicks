import { ContactoModel } from "./contacto.interface";


export interface ContactoState{
    loading: boolean;
    contactos: ContactoModel[];
}
