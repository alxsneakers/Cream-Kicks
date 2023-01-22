import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { log } from 'console';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.interface';
import { LoginService } from 'src/app/services/login.service';
import { loadUsuario } from 'src/app/state/actions/usuario.actions';
import { selectListUsuario, selectLoadingUsuario } from 'src/app/state/selectors/usuario.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  id: string;
  rutaActiva: any;
  imgSelect: any | ArrayBuffer= ''; // img por defecto.
  public userInfo: any= {};
  isLoading$: Observable<boolean>;
  userInfo$: Observable<UsuarioModel>


  constructor(private _loginSvc: LoginService, private store: Store<any>, private router: Router) { }

  ngOnInit(): void {
    this.id= localStorage.getItem('id');
    this.rutaActiva= this.router.url.split('/')[1].toUpperCase();
    this.isLoading$= this.store.select(selectLoadingUsuario);
    this.store.dispatch(loadUsuario({id: this.id}));
    this.getInfoAdmin();
  }

  /*getInfoAdmin(){
    this.userInfo$= this.store.select(selectListUsuario);
    this.userInfo$.subscribe(info => {
      this.userInfo= info;
      console.log(info);
    })
  }*/

  getInfoAdmin(): void{
    this._loginSvc.getInfoAdmin(this.id).subscribe(
      res => {
        this.userInfo= res;
      }
    )
  }

  
    
  // cierra la sesión actual
  logout(){
    this._loginSvc.logOut()
  }
}
