import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClienteModel } from '../../../models/cliente.interface';
import { deleteCliente, loadClientes } from '../../../state/actions/cliente.actions';
import { selectListClientes, selectLoadingClientes } from '../../../state/selectors/cliente.selectors';
import { ConfirmBorrarCuentaComponent } from '../../configuracion/confirm-borrar-cuenta/confirm-borrar-cuenta.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';





@Component({
  selector: 'app-index-clientes',
  templateUrl: './index-clientes.component.html',
  styleUrls: ['./index-clientes.component.scss']
})
export class IndexClientesComponent implements OnInit {

  columnsDisplay: string[]= ['nombre completo', 'email', 'funciones']; // nombre de las columnas
  data: any;
  isLoading$: Observable<boolean>;
  clientes$: Observable<ClienteModel[]>;
  searchValue: string; // guarda el valor del input.
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private store: Store<any>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading$= this.store.select(selectLoadingClientes);
    this.store.dispatch(loadClientes());
    this.printClientes();
  }


  printClientes(): void{
    this.clientes$= this.store.select(selectListClientes);
    this.clientes$.subscribe(cliente => {
      this.data= new MatTableDataSource<ClienteModel>(cliente);
      this.data.paginator= this.paginator;
    })
  }


  // filtra la informacion de la tabla.
  applyFilter(event: Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.data.filter= filterValue.trim().toLowerCase();
    if(this.data.paginator){
      this.data.paginator.firstPage();
    }
  }

  openDialog(nombre, id): void {
    const dialogRef= this.dialog.open(ConfirmBorrarCuentaComponent, {
      width: '512px',
      data: { // envio los datos al dialog
        validacion: nombre,
        nombreCuenta: nombre
      }
    });
    dialogRef.afterClosed().subscribe(res =>{
      if(res){ 
        this.store.dispatch(deleteCliente({id: id}))
      }
    });
  }

  
  





}
