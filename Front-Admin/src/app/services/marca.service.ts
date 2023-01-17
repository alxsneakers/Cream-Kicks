import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MarcaModel } from '../models/marca.interface';

export interface marca{
  nombre: String
}

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  // crea marca
  createMarca(data: MarcaModel): Observable<MarcaModel>{
    return this.http.post<MarcaModel>('http://localhost:4201/api/marcas/createMarca', data);
  }

  // devuelve todas las marcas
  allMarcas(): Observable<any>{
    return this.http.get<MarcaModel[]>('http://localhost:4201/api/marcas/allMarcas')
  }

  // borrar la marca
  borrarMarca(id): Observable<any>{
    return this.http.delete('http://localhost:4201/api/marcas/borrarMarca/'+id);
  }


  borrarSeleccionadosMarca(idsMarca): Observable<any>{
    return this.http.delete('http://localhost:4201/api/marcas/borrarSeleccionadosMarca/' + idsMarca );
  }
}
