import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-index-pedidos',
  templateUrl: './index-pedidos.component.html',
  styleUrls: ['./index-pedidos.component.css']
})
export class IndexPedidosComponent implements OnInit {

  public id;
  public token;
  public url;
  public load_data: boolean= true;
  public pedidos: Array<any>=[];
  public page=1;
  public pageSize=9;


  constructor(private _clienteService: ClienteService) {
    this.url= GLOBAL.url;
    this.id= localStorage.getItem('_id');
    this.token= localStorage.getItem('token');
   }



  ngOnInit(): void {
    this.obtener_pedidos_cliente();
  }

  obtener_pedidos_cliente(){
    this._clienteService.obtener_pedidos_cliente(this.id, this.token).subscribe(
      response =>{
        this.pedidos= response;
        this.load_data= false;
      }
    )
  }
}
