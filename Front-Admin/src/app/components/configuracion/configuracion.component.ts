import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import { deleteAccount } from 'src/app/state/actions/auth.actions';
import { ConfirmBorrarCuentaComponent } from './confirm-borrar-cuenta/confirm-borrar-cuenta.component';
import * as authActions from '../../state/actions/auth.actions';
import * as authSelectors from '../../state/selectors/auth.selectors';
import { UpdateNameAccountModel } from "src/app/models/auth.interface";


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {



  public userInfo2: any= {};
  id: string;
  formUpdateNombre!: FormGroup;
  formUploadImagenPerfil!: FormGroup;
  file : File = undefined;
  imgSelect: any | ArrayBuffer= ''; // img por defecto.
  isLoading$: Observable<boolean>;
  isError$: Observable<string | null>;



  constructor(private fb: FormBuilder, private _loginSvc: LoginService, private _ntfService: NotificationService, public dialog: MatDialog, private store: Store<any>) { }

  ngOnInit(): void {
    this.getInfoAdmin();
    this.id= localStorage.getItem('id');    
    this.formUpdateNombre= this.initForm();
    this.formUploadImagenPerfil= this.initFormUploadImagen();
    this.formUpdateNombre.patchValue({nombre: this.userInfo2.nombre})
    this.isLoading$= this.store.select(authSelectors.selectIsLoadingUpdateNombre);
    this.isError$= this.store.select(authSelectors.selectIsErrorUpdateNombre);
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombre: ['', Validators.required]
    })
  };

  initFormUploadImagen(): FormGroup{
    return this.fb.group({
      imagenPerfil: ['', Validators.required]
    });
  };

  getInfoAdmin(){
    this._loginSvc.getInfoAdmin(localStorage.getItem('id')).subscribe(
      response =>{
        this.userInfo2= response;
        this.formUpdateNombre.patchValue({nombre: this.userInfo2.nombre});           
        this.imgSelect= 'http://localhost:4201/api/obtenerImgPerfil/'+this.userInfo2.imgPerfil;            
      },
      error =>{
        console.log(error);
      }
    )
  }

  actualizar_nombre_admin(){
    const data: UpdateNameAccountModel = {nombre: this.formUpdateNombre.value, id: this.userInfo2._id};
    this.store.dispatch(authActions.cambiarNombreAccount({data}))
  }

  actualizar_imgPerfil_admin(){
    this._loginSvc.actualizar_imgPerfil_admin(this.id, this.file).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }


  getImgPerfilAdmin(idImg){
    this._loginSvc.getImgPerfilAdmin(idImg).subscribe(
      response =>{
        console.log(response);
      }
    )
  }


  // carga la imagen en el formulario cuando se añade una img.
  fileChangeEvent(event: any):void{
    var file; // guarda la img selecciona por el usuario.
    if(event.target.files && event.target.files[0]){ // comprueba si es una img.
      file = <File>event.target.files[0];
    }else{
      this._ntfService.openSnackBar('Error al subir la imagen.', 'cerrar');
    }
    // valida que la imagen pese menos de 4MB.
    if(file.size <= 4000000){ // valida el tipo de img.
      if(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/webp'){
        // carga la img.
        const reader= new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        reader.readAsDataURL(file);

        // guardo la img seleccionada por el usuario en la variable.
        this.file= file;

      }else{
        this.formUploadImagenPerfil.patchValue({imagenPerfil: 'Seleccionar imagen'}); // si la img no es valida reseteo el nombre del input.
        this._ntfService.openSnackBar('Formato no compatible. Recuerda (png, webp, jpg o jpge).', 'x');
      }
    }else{
      this._ntfService.openSnackBar('La imagen no debe pasar de 4MB.', 'x');
    }
    console.log(this.file);
  }

  openDialog(): void {
    const dialogRef= this.dialog.open(ConfirmBorrarCuentaComponent, {
      width: '512px',
      data: { // envio los datos al dialog
        validacion: this.userInfo2.nombre,
        nombreCuenta: this.userInfo2.nombre
      }
    });
    dialogRef.afterClosed().subscribe(res =>{
      if(res){ 
        this.store.dispatch(deleteAccount({id: this.userInfo2._id}))
      }
    });
  }




  



}
