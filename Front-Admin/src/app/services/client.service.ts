import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteModel } from '../models/cliente.interface';

export interface client{
  nombre: string,
  apellidos: string,
  pais: string,
  telefono: string
}


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }


  // crea un cliente
  createClient(data): Observable<any>{
    return this.http.post('http://localhost:4201/api/createProveedor_admin', data);
  }

  // Devuelve todos los clientes de la bdd.
  allClients(): Observable<ClienteModel[]>{
    return this.http.get<ClienteModel[]>('http://localhost:4201/api/allClient_admin');
  }


  borrar_cliente_admin(id): Observable<any>{
    return this.http.delete('http://localhost:4201/api/borrar_cliente_admin/'+id);
  }

  obtener_compras_cliente(id): Observable<any>{
    return this.http.get('http://localhost:4201/api/obtener_pedidos_cliente/'+id);
  }

  obtener_detalle_compra_cliente(idVenta): Observable<any>{
    return this.http.get('http://localhost:4201/api/obtener_detalle_pedido_cliente/'+idVenta);
  }

  
}
