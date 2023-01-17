import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface cupon{
  codigo: string,
  tipo: string,
  valor: number,
  limite: number
}

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  constructor(private http: HttpClient) { }

  // crea cupon
  createCupon(data): Observable<any>{
    return this.http.post<any>('http://localhost:4201/api/cupones/createCupon', data);
  }

  // devuelve todos los productos
  allCupones(): Observable<cupon[]>{
    return this.http.get<cupon[]>('http://localhost:4201/api/cupones/allCupones');
  }

  // obtiene el cupon por el id
  obtenerCupon(id): Observable<any>{
    return this.http.get<any>('http://localhost:4201/api/cupones/obtenerCupon/' + id);
  }

  // actualiza el cupon
  actualizarCupon(data, id): Observable<any>{
    return this.http.put('http://localhost:4201/api/cupones/actualizaCupon/'+id, data);
  }

  borrarCupon(id): Observable<any>{
    return this.http.delete('http://localhost:4201/api/cupones/borrarCupon/'+id);
  }
}
