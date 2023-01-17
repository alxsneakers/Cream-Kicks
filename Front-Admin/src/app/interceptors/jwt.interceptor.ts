import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}


  /* Lo que hace el interceptor es que intercepta todas las peticiones http
    que se realizen ['get', 'post', 'delete', 'put'] */

  // Si tengo un token en las cookies, agrego el token en el Header de las peticiones http.
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token'); 
    let request= req;
    if(token){
      request= req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}
