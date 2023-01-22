import { Component, OnInit, ViewChild } from '@angular/core';
import { product, ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { io } from 'socket.io-client';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  columnsDisplay: string[]= ['bestProductos', 'precios'];
  data: any;
  ventasTotales: any;
  totalProductos: any;
  ganancia: any;
  totalUsuarios: any;
  public socket= io('http://localhost:4201');


  constructor(private store: Store<any>, private _productoService: ProductService) {}

  emitir(){
    this.socket.emit('total-ventas');
  }
  
  
  ngOnInit(): void {
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






}
