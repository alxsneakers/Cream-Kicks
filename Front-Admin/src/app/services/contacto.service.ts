import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactoModel } from '../models/contacto.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }


  allMensajes(): Observable<any>{
    return this.http.get<ContactoModel[]>('http://localhost:4201/api/obtener_mensajes_admin');
  }

  cerrar_mensaje_admin(id, data): Observable<any>{
    return this.http.put('http://localhost:4201/api/cerrar_mensaje_admin/'+id, data);
  }




}
