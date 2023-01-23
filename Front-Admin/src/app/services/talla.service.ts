import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TallaModel } from '../models/talla.interface';

@Injectable({
  providedIn: 'root'
})
export class TallaService {

  constructor(private http: HttpClient) { }

  // crea talla
  createTalla(data: TallaModel): Observable<TallaModel>{
    return this.http.post<TallaModel>('http://localhost:4201/api/tallas/createMarca', data);
  }

  // devuelve todas las tallas
  allTallas(): Observable<any>{
    return this.http.get<TallaModel[]>('http://localhost:4201/api/tallas/obtenerTallas')
  }
}
