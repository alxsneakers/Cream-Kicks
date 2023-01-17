import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { ContactoService } from "../../services/contacto.service";

@Injectable()
export class ContactoEffects {


    // Se pone el simbolo del dolar($) porque es un observable. Se hace por comvencion.
    constructor(private actions$: Actions, private contactoService: ContactoService){};


    loadContactos$= createEffect(() => this.actions$.pipe(
        ofType('[Contacto List] Load contactos'), // encargado de escuchar la accion
        mergeMap(() => this.contactoService.allMensajes() // retorna la data
            .pipe(
                map(contactos => ({type: '[Contacto List] Loaded success', contactos})),
                catchError(() => EMPTY)
            ))    
        )
    );
};