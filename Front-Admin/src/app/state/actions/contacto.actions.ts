import { createAction, props } from "@ngrx/store";
import { ContactoModel } from "src/app/models/contacto.interface";


// accion para cargar los contactos
export const loadContactos= createAction(
    '[Contacto List] Load contactos' // type *
)


// acccion para cuando los contactos se ha cargado
export const loadedContactos= createAction(
    '[Contacto List] Loaded success',
    props<{contactos: ContactoModel[]}>()
)