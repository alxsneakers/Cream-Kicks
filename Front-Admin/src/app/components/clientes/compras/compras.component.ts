import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CompraModel } from '../../../models/cliente.interface';
import { ClientService } from '../../../services/client.service';
import { loadCompras } from '../../../state/actions/cliente.actions';
import { selectListCompras, selectLoadingCompras } from '../../../state/selectors/cliente.selectors';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  constructor(private store: Store<any>, private router: ActivatedRoute) { }

  idCliente: string;
  columnsDisplay: string[]= ['id', 'creado', 'estado', 'subtotal', 'funciones']; // nombre de las columnas
  data: any;
  isLoading$: Observable<boolean>;
  compras$: Observable<CompraModel[]>;
  searchValue: string; // guarda el valor del input.
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getIdUrl();
    this.isLoading$= this.store.select(selectLoadingCompras);
    this.store.dispatch(loadCompras({id: this.idCliente}));
    this.printCompras();
  }

  printCompras(){
    this.compras$= this.store.select(selectListCompras);
    this.compras$.subscribe(compra => {
      this.data= new MatTableDataSource<CompraModel>(compra);
      this.data.paginator= this.paginator;
    })
  }

  // obtiene el id del parametro url
  getIdUrl(): void{
    this.router.params.subscribe(params =>{
      this.idCliente= params['id'];
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
