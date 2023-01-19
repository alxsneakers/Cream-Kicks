import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';


export interface Producto {
  nombre: string;
  portada: string;
  _id: string;
} 


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;
  public token;
  
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.url = GLOBAL.url;
    this.token= localStorage.getItem('token');
    // si tienes token, es decir has iniciado sesion, to te deja acceder a login.
    if(this.token){
      this._router.navigate(['/']);
    }
  }



  searchProductos(query: string){
    return this._http.post<{payload: Array<Producto>}>('http://localhost:4201/api/products/getProductos', {payload: query}, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      map(data => data.payload)
    );
  }

  login_cliente(data):Observable<any>{
    return this._http.post(this.url+'login_cliente', data);
  }

  registro_cliente(data): Observable<any>{
    return this._http.post(this.url+'registro_cliente', data);
  }

  obtener_ultimos_productos(): Observable<any>{
    return this._http.get('http://localhost:4201/api/products/obtener_ultimos_productos');
  }


  obtener_populares_productos(): Observable<any>{
    return this._http.get('http://localhost:4201/api/products/obtener_populares_productos');
  }

  obtener_cantidad_marca(marca: string): Observable<any>{
    return this._http.get('http://localhost:4201/api/products/obtener_cantidad_marca/'+marca);
  }


  // devuelve información del usuario que ha iniciado sesion
  obtener_cliente_guest(id,token):Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.get(this.url+'obtener_cliente/'+id, {headers:headers});
  }

  actualizar_perfil_cliente_guest(token:any,data:any,id:any):Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.put('http://localhost:4201/api/actualizar_perfil/'+id, data, {headers:headers});
  }

  // devuelve todas las marcas de la tienda
  obtener_marcas(): Observable<any>{
    return this._http.get('http://localhost:4201/api/marcas/obtenerMarcas');
  }

  // filtra los productos por marcas
  listar_productos_publico(filtro): Observable<any>{
    return this._http.get('http://localhost:4201/api/products/listar_productos_publico?filtroName=' + filtro);
  }

  agregar_carrito_cliente(data,token):Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.post(this.url+'carrito/agregar_carrito_cliente', data ,{headers:headers});
  }

  obtener_carrito_cliente(id,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.get(this.url+'carrito/obtener_carrito_cliente/'+id ,{headers:headers});
  }

  eliminar_carrito_cliente(id,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.delete(this.url+'carrito/eliminar_carrito_cliente/'+id ,{headers:headers});
  }

  registro_direccion_cliente(data,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.post(this.url + 'direcciones/registro_direccion', data, {headers: headers});
  }

  obtener_direcciones_cliente(idCliente,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.get(this.url + 'direcciones/obtener_direcciones_cliente/'+idCliente, {headers: headers});
  }

  cambiar_direccion_principal_cliente(id,idCliente,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.put(this.url + 'direcciones/cambiar_direccion_principal_cliente/' + id + '/' + idCliente,{headers: headers}); 
  }

  obtener_direccion_principal_cliente(idCliente,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.get(this.url + 'direcciones/obtener_direccion_principal_cliente/' + idCliente, {headers: headers});
  }

  obtener_tipo_envios(): Observable<any>{
    return this._http.get(this.url + 'envios/obtener_tipo_envio');
  }

  registro_compra_cliente(data,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.post(this.url + 'ventas/registro_compra_cliente', data, {headers: headers});
  }

  enviar_correo_compra(idVenta,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.get(this.url + 'ventas/enviar_correo_compra/'+ idVenta, {headers: headers});
  }

  validar_cupon(cupon,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.get(this.url + 'cupones/validarCupon/'+ cupon, {headers: headers});
  }

  obtener_stock_talla(id, talla): Observable<any>{
    return this._http.get(this.url + 'products/get_talla_stock_producto/' + id + '/' + talla);
  }


  obtener_pedidos_cliente(id,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.get(this.url + 'obtener_pedidos_cliente/' +id, {headers: headers});
  }

  obtener_detalle_pedido_cliente(id,token): Observable<any>{
    let headers = new HttpHeaders({'Content-type':'application/json','Authorization': 'Bearer '+ token});
    return this._http.get(this.url + 'obtener_detalle_pedido_cliente/' +id, {headers: headers});
  }

  



  public isAuthenticated():boolean{
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      if (helper.isTokenExpired(token)) {
          localStorage.clear();
          return false;
      }

      if (!decodedToken) {
        console.log('NO ES VALIDO');
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }
    return true;
  }
  
}

