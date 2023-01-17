import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface product{
  nombre: string,
  marca: string,
  sku: string,
  tallas: string[]
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }



  // crea un producto
  createProduct(data, file): Observable<any>{
    // agrego a los datos del formulario la img.
    const fd= new FormData();
    fd.append('nombre', data.nombre);
    fd.append('marca', data.marca);
    fd.append('sku', data.sku);
    fd.append('precioCompra', data.precioCompra);
    fd.append('precioVenta', data.precioVenta);
    fd.append('tallaStockArray',  JSON.stringify(data.tallaStockArray));
    fd.append('publicado', data.publicado);
    fd.append('portada', file); // añado el archivo de la img al campo portada.
    return this.http.post('http://localhost:4201/api/products/createProduct', fd);
  };

  // Obtiene un producto por el id.
  obtenerProducto(id): Observable<any>{
    return this.http.get('http://localhost:4201/api/products/obtenerProducto/'+ id);
  };

  // devuelve los nombre de las img de la galeria del producto.
  obtenerGaleria(id): Observable<any>{
    return this.http.get('http://localhost:4201/api/products/obtenerGaleria/' + id);
  };

  // Devuelve todos los productos.
  allProducts(): Observable<product[]>{
    return this.http.get<product[]>('http://localhost:4201/api/products/allProducts');
  };

  // borra un producto.
  deleteProduct(id): Observable<any>{
    return this.http.delete('http://localhost:4201/api/products/deleteProduct/'+id)
  };

  borrarSeleccionadosProducto(idsProducto): Observable<any>{
    return this.http.delete('http://localhost:4201/api/products/borrarSeleccionadosProducto/' + idsProducto );
  }



  // Actualiza el producto.
  actualizarProducto(data, file, id): Observable<any>{
    if(data.portada){ // si hay nueva img
      const fd= new FormData();
      fd.append('nombre', data.nombre);
      fd.append('marca', data.marca);
      fd.append('sku', data.sku);
      fd.append('tallas', data.tallas);
      fd.append('stock', data.stock);
      fd.append('precioCompra', data.precioCompra);
      fd.append('precioVenta', data.precioVenta);
      fd.append('tienda', data.tienda);
      fd.append('portada', file); // añado el archivo de la img al campo portada.
      return this.http.put('http://localhost:4201/api/products/actualizarProducto/' + id, fd);
    }else{ // img actual (no ha cambiado la img)
      return this.http.put('http://localhost:4201/api/products/actualizarProducto/' + id, data);
    }
  };

  agregarImgGaleria(data, file, id): Observable<any>{
    const fd= new FormData();
    fd.append('_id', data._id);
    fd.append('imagen', file); // agrego la img
    return this.http.put('http://localhost:4201/api/products/agregarImgGaleria/' + id, fd);
  }


  eliminarImgGaleria(id, data): Observable<any>{
    return this.http.put('http://localhost:4201/api/products/eliminarImgGaleria/'+id, data);
  }

}
