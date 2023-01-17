import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/auth.interface';
import * as authSelectors from '../../state/selectors/auth.selectors';
import * as authActions from '../../state/actions/auth.actions';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //error: Error | null = null
  isLoading$: Observable<boolean>;
  isError$: Observable<string | null >;

  constructor(private _store: Store<any>){
    this.isLoading$= this._store.select(authSelectors.selectIsLoadingLogin)
    this.isError$= this._store.select(authSelectors.selectIsErrorLogin);
  }

  // Controla que todos los campos del formulario son validos
  public formValidator= new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });


  login(){
    const data: LoginModel= this.formValidator.value;
    this._store.dispatch(authActions.loginAction({data}));
  }

  setErrorLogin(message: string){
    this._store.dispatch(authActions.loginErrorAction({message}));
  }

  
  /*ogin(){
    this.loginSvc.login_admin(this.formValidator.value).subscribe({
      next: data =>{
        localStorage.setItem('session', data.token) // guardo el token.
        localStorage.setItem('idSession', data._id) // guardo el id de la session
        this.router.navigate(['/dashboard']);
      },
      error: error =>{
        this.error= error.error.error;
      }
    })
  }*/

  

 

  // cierra session
  /*logOut(){
   this.loginSvc.logOut()
  }*/

}