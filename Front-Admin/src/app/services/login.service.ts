import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt"; // verifica si el token es correcto.
import { Observable } from 'rxjs';
import { LoginModel, LoginResponse, UpdateNameAccountModel } from '../models/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  

  constructor(private router: Router, private http: HttpClient) { }


  // Cierra la sesion, borrando el localStorage "session" en el que esta guardado el token.
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }

  login_admin(data: LoginModel): Observable<LoginResponse>{
    return this.http.post<LoginResponse>('http://localhost:4201/api/login_admin', data);
  }

  // Obtiene informacion del usuario que ha iniciado session.
  getInfoAdmin(id){
    return this.http.get('http://localhost:4201/api/obtenerAdmin/'+id);
  }

  getImgPerfilAdmin(idImg){
    return this.http.get('http://localhost:4201/api/obtenerImgPerfil/' + idImg);
  }

  // Devuelve el token.
  getToken(){
    return localStorage.getItem('token');
  }

  // Comprueba si el token (sessión) es valido.
  verifyToken(){
    const token= localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    if(!token){
      return false;
    }else if(!decodedToken){
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }

  actualizar_nombre_admin(data: UpdateNameAccountModel): Observable<any>{
    console.log(data.nombre)
    return this.http.put('http://localhost:4201/api/actualizar_nombre_admin/'+data.id, data.nombre);
  }

  actualizar_imgPerfil_admin(id, file): Observable<any>{
    const fd= new FormData();
    fd.append('imagenPerfil', file);
    return this.http.put('http://localhost:4201/api/actualizar_imgPerfil_admin/'+id, fd);
  }

  eliminar_cuenta_admin(id): Observable<any>{
    return this.http.delete('http://localhost:4201/api/borrar_cuenta_admin/'+id);
  }

  borrar_cuenta_admin(id): Observable<any>{
    return this.http.delete('http://localhost:4201/api/borrar_cuenta_admin/'+id);
  }
}
