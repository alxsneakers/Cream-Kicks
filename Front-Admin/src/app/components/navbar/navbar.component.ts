import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { UserModel } from '../../models/auth.interface';
import * as authActions from '../../state/actions/auth.actions';
import * as authSelectors from '../../state/selectors/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  imgSelect: any | ArrayBuffer= ''; // img por defecto.
  public userInfo: any= {};
  isLoading$: Observable<boolean>;
  userInfo$: Observable<any>


  constructor(private _loginSvc: LoginService, private store: Store<any>) { }

  ngOnInit(): void {
    this.isLoading$= this.store.select(authSelectors.selectLoadingUserInfo);
    this.store.dispatch(authActions.loadUserInfo({id: localStorage.getItem('id')}));
    this.getInfoAdmin();
    
  }


  getInfoAdmin(){
    this.userInfo$= this.store.select(authSelectors.selectListUserInfo);
    this.userInfo$.subscribe(info => {
      console.log(info);
      
    })
  
  }
    
  // cierra la sesión actual
  logout(){
    this._loginSvc.logOut()
  }
}
