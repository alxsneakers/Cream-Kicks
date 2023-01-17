import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DescuentoModel } from '../models/descuento.interface';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  constructor(private http: HttpClient) { }


  registro_descuento(data, file){
    const fd= new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descuento', data.descuento);
    fd.append('fecha_inicio', this.formatFecha(data.fecha_inicio.toString()));
    fd.append('fecha_fin', this.formatFecha(data.fecha_fin.toString()));
    fd.append('banner', file);
    return this.http.post('http://localhost:4201/api/descuentos/registro_descuento', fd);
  }


  // Devuelve todos los descuentos.
  listarDecuento(): Observable<any>{
    return this.http.get<DescuentoModel[]>('http://localhost:4201/api/descuentos/listar_descuentos');
  };

  obtener_descuento(id): Observable<any>{
    return this.http.get<DescuentoModel>('http://localhost:4201/api/descuentos/obtener_descuento/' + id)
  };

  actualizar_descuento(data, file, id): Observable<any>{
    if(data.banner){ // cambio de img
      const fd= new FormData();
      fd.append('titulo', data.titulo);
      fd.append('descuento', data.descuento);
      fd.append('fecha_inicio', this.formatFecha(data.fecha_inicio.toString()));
      fd.append('fecha_fin', this.formatFecha(data.fecha_fin.toString()));
      fd.append('banner', file);
      return this.http.put('http://localhost:4201/api/descuentos/actualizar_descuento/' + id, fd);
    }else{
      return this.http.put('http://localhost:4201/api/descuentos/actualizar_descuento/' + id, data);
    }
  };

  // '2023-01-08T23:00:00.000+00:00' a '2023-01-08'
  formatFecha(fecha: string){
    const newDate= new Date(fecha);  
    return newDate.toLocaleDateString('en-US');
  }
}
