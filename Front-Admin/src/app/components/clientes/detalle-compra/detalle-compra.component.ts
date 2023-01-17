import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DetalleCompraModel } from '../../../models/cliente.interface';
import { loadDetalleCompra } from '../../../state/actions/cliente.actions';
import { selectListDetalleCompra, selectLoadingDetalleCompra } from '../../../state/selectors/cliente.selectors';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.scss']
})
export class DetalleCompraComponent implements OnInit {

  constructor(private store: Store<any>, private router: ActivatedRoute) { }


  url: any;
  idCompra: string;
  isLoading$: Observable<boolean>;
  detalleCompra$: Observable<DetalleCompraModel>;
  dCompra: any= {};


  ngOnInit(): void {
    this.url= 'http://localhost:4201/api/products/';
    this.getIdUrl();
    this.isLoading$= this.store.select(selectLoadingDetalleCompra);
    this.store.dispatch(loadDetalleCompra({id: this.idCompra}));
    this.printDetalleCompra();
  }


  printDetalleCompra(){
    this.detalleCompra$= this.store.select(selectListDetalleCompra);
    this.detalleCompra$.subscribe(compra => {
      this.dCompra= compra;
    })
  }

   // obtiene el id del parametro url
   getIdUrl(): void{
    this.router.params.subscribe(params =>{
      this.idCompra= params['id'];
    })
  }


}
