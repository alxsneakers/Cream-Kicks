import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;

declare var $:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public cliente : any = {};
  public id;
  public token;

  constructor(
    private _clienteService : ClienteService
  ) {
    this.id= localStorage.getItem('_id');
    this.token= localStorage.getItem('token');

    if(this.id){
      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
        response =>{
          this.cliente= response.data;
        },
        error =>{
          console.log(error.message);
        }
      )};
   }

  ngOnInit(): void {
  }

  actualizar(actualizarForm:any){
    if (actualizarForm.valid) { 
      this.cliente.password = $('#input_password').val(); // obtiene la nueva contrasena
      this._clienteService.actualizar_perfil_cliente_guest(this.token,this.cliente,this.id).subscribe(
        response=>{
          console.log(response.message)
        }
      );
    }else{
      console.log('Error al actualizar el perfil.');
    }
  }


  onlyNumbers(event): boolean{
    const charCode= (event.which)?event.which: event.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
    }
    return true;
  }

  onlyText(event): boolean{
    const charCode= (event.which)?event.which: event.keyCode;
    if(((charCode >= 65 && charCode <= 90) || (event.keyCode > 96 && event.keyCode < 123) || charCode == 8)){
      return true;
    }
    return false;
  }

  validateDNI(event): boolean{
    const charCode= (event.which)?event.which: event.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57) && event.target.value.length <= 7){
      return false;
    }
    return true;
  }


}
