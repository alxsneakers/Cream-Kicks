import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';


@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url;

  constructor(private _http: HttpClient,private _router: Router) {
    this.url = GLOBAL.url;
   }

  obtener_producto_publico(id): Observable<any>{
    return this._http.get(this.url + 'products/obtener_producto_publico/' + id);
  }

  listar_productos_recomendados_publico(marca): Observable<any>{
    return this._http.get('./assets/provincias.json');
  }

  get_provincias(): Observable<any>{
    return this._http.get('./assets/provincias.json');
  }

  obtener_descuento_activo(): Observable<any>{
    return this._http.get(this.url + 'descuentos/obtener_descuento_activo');
  }

  enviar_mensaje_contacto(data){
    return this._http.post(this.url + 'enviar_mensaje_contacto', data);
  }

  

}
