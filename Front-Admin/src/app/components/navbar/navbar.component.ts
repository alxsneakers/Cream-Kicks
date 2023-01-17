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
    this.store.dispatch(authActions.loadUserInfo({id: '63809edcc95dfc191babb3fa'}));
    this.getInfoAdmin();
    
  }


  getInfoAdmin(){
    this._loginSvc.getInfoAdmin(localStorage.getItem('id')).subscribe(
      response => {
        this.userInfo= response;
        this.imgSelect= 'http://localhost:4201/api/obtenerImgPerfil/'+this.userInfo.imgPerfil;
      },
      error =>{
        console.log(error);
      }
    )
    /*this.userInfo$= this.store.select(authSelectors.selectListUserInfo);
    this.userInfo$.subscribe(info => {
      console.log(info);
      
    })*/

    

    
  }
    

}
