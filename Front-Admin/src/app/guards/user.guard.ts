import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { timeStamp } from 'console';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor (private router: Router, private loginSvc: LoginService) {}

  
  // Si el usuario no ha iniciado sesion, no le deja acceder a la ruta ('/dashboard')
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.loginSvc.verifyToken()){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}