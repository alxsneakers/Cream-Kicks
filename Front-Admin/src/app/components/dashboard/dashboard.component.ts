import { Component, OnInit, ViewChild } from '@angular/core';
import { product, ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { io } from 'socket.io-client';
import { MatDialog } from '@angular/material/dialog';
import { CreateMarcaComponent } from '../añadir/create-marca/create-marca.component';
import { Observable } from 'rxjs';
import { selectIsErrorCreateMarca } from 'src/app/state/selectors/marca.selectors';
import { selectIsErrorCreateAdmin } from 'src/app/state/selectors/auth.selectors';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { CreateTallaComponent } from '../añadir/create-talla/create-talla.component';
import { selectIsErrorCreateTalla } from 'src/app/state/selectors/talla.selectors';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  errorCreateAdmin$: Observable<string | null>;
  errorMarca$: Observable<string | null>;
  errorTalla$: Observable<string | null>;
  columnsDisplay: string[]= ['bestProductos', 'precios'];
  data: any;
  ventasTotales: any;
  totalProductos: any;
  ganancia: any;
  totalUsuarios: any;
  public socket= io('http://localhost:4201');


  constructor(private store: Store<any>, public dialog: MatDialog) {}

  emitir(){
    this.socket.emit('total-ventas');
  }
  
  
  ngOnInit(): void {
    // captura error al crear una marca y crear admin
    this.errorMarca$= this.store.select(selectIsErrorCreateMarca);
    this.errorCreateAdmin$= this.store.select(selectIsErrorCreateAdmin);
    this.errorTalla$= this.store.select(selectIsErrorCreateTalla);


    this.socket.on('bestProductos', (res) => {
      this.data= new MatTableDataSource<any>(res.productos);
    });

    this.socket.on('ventasTotales', (res) => {
      this.ventasTotales= res.ventasTotales;
    });

    this.socket.on('ganancias', (res) => {
      this.ganancia= res.ganancias;
    });

    this.socket.on('totalProductos', (res) => {
      this.totalProductos= res.totalProductos;
    });

    this.socket.on('totalUsuarios', (res) => {
      this.totalUsuarios= res.totalUsuarios;
    });



  }

  DialogAgregarCupon(): void{
    const dialogRef = this.dialog.open(CreateMarcaComponent,{
      width: '512px',
    });
  }


  DialogCreateAdmin(): void{
    const dialogRef = this.dialog.open(CreateAdminComponent,{
      width: '512px',
    });
  }

  DialogCreateTalla(): void{
    const dialogRef = this.dialog.open(CreateTallaComponent,{
      width: '512px',
    });
  }

  






}
