import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivateChild {

  constructor(private router: Router, private loginSvc: LoginService){}
  
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.loginSvc.verifyToken()){
      this.router.navigateByUrl('http://localhost:4200/');
      return false;
    }
    return true;
  }  
}
