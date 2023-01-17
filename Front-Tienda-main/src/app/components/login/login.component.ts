import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { NotificationService } from 'src/app/services/notification.service';

declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public account: any= {};
  public usuario : any = {};
  public token;
  errorLogin: Error | null= null;
  errorAccount: Error | null= null;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router,
    private notificationSvc: NotificationService

  ) {
    // Verificamos si hay un token o no  y hacemos una redireccion a la pag de inicio
    this.token = localStorage.getItem('token');
    if (this.token) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  createAccount(accountForm: any){
      let data= {
        nombre: this.account.nombre,
        apellidos: this.account.apellidos,
        email: this.account.email,
        password: this.account.password
      }
      this._clienteService.registro_cliente(data).subscribe(
        response =>{
          iziToast.success({
            title:'OK',
            position: 'topRight',
            message: response.message
          })
          this.account=''; // limpio el formulario
        },
        error =>{
          this.errorAccount= error.error.error;
          this.account=''; // limpio el formulario
        }
      )
    }
  

  login(loginForm:any){
    if(loginForm.valid){
      let data = {
        email:this.user.email,
        password: this.user.password
      }
      this._clienteService.login_cliente(data).subscribe(
        response=>{
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id',response._id);
            // Redireccion
            this._router.navigate(['/']);
        },
        error =>{
          this.errorLogin= error.error.error;
        }
      );

    }/*else{
      // Notificacion
      iziToast.show({
        title:'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      })
    } */     
  }


}
