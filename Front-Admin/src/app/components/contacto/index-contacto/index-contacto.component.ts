import { Component, OnInit, SchemaMetadata, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContactoModel } from 'src/app/models/contacto.interface';
import { ContactoService } from 'src/app/services/contacto.service';
import { NotificationService } from 'src/app/services/notification.service';
import { loadContactos } from 'src/app/state/actions/contacto.actions';
import { selectListContactos, selectLoadingContactos } from 'src/app/state/selectors/contacto.selectors';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
      
      

    

@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.scss']
})
export class IndexContactoComponent implements OnInit {

  mensajesFiltrados= '';
  loading$: Observable<boolean>= new Observable()
  contactos$: Observable<ContactoModel[]>;

  constructor(private store: Store<any>,public dialog: MatDialog, private _contactoSvc : ContactoService, private _ntfSvc: NotificationService) { }

  ngOnInit(): void {
    this.loading$= this.store.select(selectLoadingContactos);
    this.store.dispatch(loadContactos()); // llama a la accion
    this.contactos$= this.store.select(selectListContactos);
  }


  // abre el modal, para eliminar un cupon.
  openDialog(nombre, id): void{
    const dialogRef= this.dialog.open(ConfirmDialogComponent, {
      width: '512px',
      data: { // envio los datos al dialog
        titulo: 'contacto',
        nombre: nombre
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.cerrarMensaje(id);
      }
    });
  }

  cerrarMensaje(id){
    this._contactoSvc.cerrar_mensaje_admin(id, {data: undefined}).subscribe(
      response =>{ // actulizo los datos 
        this.store.dispatch(loadContactos()); // llama a la accion
        this.contactos$= this.store.select(selectListContactos);
        this._ntfSvc.openSnackBar(response.message, 'X');
      }
    )
  }





}
