import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PedidoModel } from '../../../models/cliente.interface';
import { ClientService } from '../../../services/client.service';
import { loadPedidos } from '../../../state/actions/cliente.actions';
import { selectListPedidos, selectLoadingPedidos } from '../../../state/selectors/cliente.selectors';

@Component({
  selector: 'app-index-pedido',
  templateUrl: './index-pedido.component.html',
  styleUrls: ['./index-pedido.component.scss']
})
export class IndexPedidoComponent implements OnInit {

  constructor(private store: Store<any>) { }

  isLoading$: Observable<boolean>;
  pedidos$: Observable<PedidoModel[]>;
  columnsDisplay: string[]= ['clienteCorreo', 'id', 'creado', 'estado', 'subtotal']; // nombre de las columnas
  data: any;
  data2: any;
  searchValue: string; // guarda el valor del input.
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.isLoading$= this.store.select(selectLoadingPedidos);
    this.store.dispatch(loadPedidos());
    this.printPedidos();
  }


  printPedidos(){
    this.pedidos$= this.store.select(selectListPedidos);
    this.pedidos$.subscribe(pedido => {
      this.data= new MatTableDataSource<PedidoModel>(pedido);
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

}
