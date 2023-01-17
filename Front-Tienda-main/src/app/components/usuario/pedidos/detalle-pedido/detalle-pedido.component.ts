import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  public idVenta;
  public token;
  public url;
  public load_data: boolean= true;
  public pedido: any= {};
  public detalles_pedido: Array<any>=[];

  constructor(private _clienteService: ClienteService, private _route: ActivatedRoute) {
    this.url= GLOBAL.url;
    this.token= localStorage.getItem('token');
    // obtiene el id del producto a partir del parametro de la url
    this._route.params.subscribe(
      params =>{
        this.idVenta= params['id'];
        this._clienteService.obtener_detalle_pedido_cliente(this.idVenta,this.token).subscribe(
          res =>{
            this.pedido= res.data;
            this.detalles_pedido=res.detalles;
            this.load_data=false;
            console.log(res.data);
            
          }

        )
      }
    );
  }



  ngOnInit(): void {
  }


  

}
