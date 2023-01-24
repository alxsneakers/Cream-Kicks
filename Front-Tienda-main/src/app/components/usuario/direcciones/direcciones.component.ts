import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { GuestService } from 'src/app/services/guest.service';
import { NotificationService } from 'src/app/services/notification.service';
declare var iziToast:any;

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {


  // variables
  public token;
  public id;
  error: Error | null= null;
  public direccion : any = {
    destinatario: '',
    provincia: '',
    ciudad: '',
    calle: '',
    telefono: '',
    codigoPostal: '',
    principal: false
  };
  public direcciones: Array<any>= [];
  public provincias: Array<any> = [];
  public load_data= true; // precargador para listar las direcciones



  constructor(private _guestService: GuestService, private _notificationService: NotificationService, private _clienteService: ClienteService) { }

  ngOnInit(): void {
    // obtiene el token
    this.token= localStorage.getItem('token');
    this.id= localStorage.getItem('_id');

    // obtiene todas las provincias
    this._guestService.get_provincias().subscribe(
      response =>{
        response.forEach(element => {
          this.provincias.push(element.nombre)
        });
      }
    )
    this.obtener_direcciones();
  }

  // registra una direccion.
  registrar(registroForm){
    if(registroForm.valid){ // si el formulario es valido
      const data={
        cliente: localStorage.getItem('_id'),
        destinatario: this.direccion.destinatario,
        dni: this.direccion.dni,
        calle: this.direccion.calle,
        provincia: this.direccion.provincia,
        ciudad: this.direccion.ciudad,
        principal: this.direccion.principal,
        codigoPostal: this.direccion.codigoPostal,
        telefono: this.direccion.telefono
      }
      this._clienteService.registro_direccion_cliente(data,this.token).subscribe(
        response =>{
          console.log(data)
          this.direccion= '';  // limpio el formulario
          this.obtener_direcciones(); // obtengo los datos actualizados.
          iziToast.success({
            title:'OK',
            position: 'topRight',
            message: response.message
          })
        },
        error =>{
          this.error= error.error.error;
        }
      )
    }else{
      this._notificationService.openSnackBar('Los datos del formulario son incorrectos.', 'cerrar');
  }
  }

  // obtiene todas las direcciones del cliente
  obtener_direcciones(){
    this._clienteService.obtener_direcciones_cliente(this.id,this.token).subscribe(
      response =>{
        this.direcciones= response;
        this.load_data= false; // termina la peticion
      }
    )
  }

  // cambia
  cambiar_principal(idDireccion){
    this._clienteService.cambiar_direccion_principal_cliente(idDireccion,this.id,this.token).subscribe(
      response =>{
        this._notificationService.openSnackBar(response.message, 'cerrar');
        this.obtener_direcciones();
      }
    )
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

}
