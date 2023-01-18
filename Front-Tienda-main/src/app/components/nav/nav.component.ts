import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService, Producto } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { GuestService } from 'src/app/services/guest.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  public hasQuey: Boolean= false;
  public productos: Array<Producto>= [];
  public url;
  public token;
  public id;
  public user : any = undefined;
  public user_lc : any= undefined;
  public marcas: any= [];
  public op_cart= false; // indica el estado (open|close) del modal para el carrito
  public carrito_arr: Array<any>= []; // guarda todo los productos añadidos al carrito.
  public subtotal=0;
  public socket= io('http://localhost:4201');
  public descuento_activo: any= null;


  constructor(private _clienteService: ClienteService, private _router: Router, private _guestService: GuestService) {
    // obtengo el id y el token del usuario guardado en el localStorage
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url= GLOBAL.url;

   
    // servicio para obtener cliente
    if(this.token){
      this._clienteService.obtener_cliente_guest(this.id,this.token).subscribe(
        response=>{
          this.user = response.data;
          localStorage.setItem('user_data', JSON.stringify(this.user));
          if(localStorage.getItem('user_data')){
            this.user_lc= this.user;
            this.obtener_carrito_cliente();
          }else{
            this.user_lc= undefined;
          }
        },error=>{
          console.log(error);
          this.user = undefined;
        }
      ); 
    }

    // servicio para obtener las marcas
    this._clienteService.obtener_marcas().subscribe(
      response =>{  
       this.marcas= response;
      }
    )
  }

  
  sendData(event: any){
    let query: string= event.target.value;
    // si no se ha encontrado ningun resltado o es todo espacios
    let matchSpaces: any= query.match(/\s*/);
    if(matchSpaces[0]=== query){
      this.productos=[];
      this.hasQuey= false;
      return;
    }
    this._clienteService.searchProductos(query.trim()).subscribe(results => {
      this.productos=results;
      this.hasQuey= true;
      console.log(results);
      
    })
  }


  ngOnInit(): void {
    this.obtener_descuento_activo();
    // actualiza el carrito cada vez que hace una peticion al backend para eliminar un producto.
    this.socket.on('update-carrito-delete', function(this: NavComponent){
      this.obtener_carrito_cliente();
    }.bind(this));

    this.socket.on('update-carrito-add', function(this: NavComponent){
      this.obtener_carrito_cliente();
    }.bind(this));
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }

  // abre el modal o lo cierra segun el estado
  op_modalcart(){
    if(!this.op_cart){
      this.op_cart= true;
    }else{
      this.op_cart= false;
    }
  }

  // calcula el precio total del carrito
  total_carrito(){
    this.subtotal=0;
    if(this.descuento_activo == null){
      this.carrito_arr.forEach(element =>{
        this.subtotal= this.subtotal + parseInt(element.producto.precioVenta);
      }); // si hay descuento
    }else if(this.descuento_activo != null){
      this.carrito_arr.forEach(element =>{
        let newPrecio= Math.round(parseInt(element.producto.precioVenta) - (parseInt(element.producto.precioVenta)*this.descuento_activo.descuento)/100) ;
        this.subtotal= this.subtotal + newPrecio;
      });
      
    }
  }

  eliminar_item(idItemCarrito){
    this._clienteService.eliminar_carrito_cliente(idItemCarrito,this.token).subscribe(
      response =>{
        this.socket.emit('delete-carrito', {data: response})
        console.log(response);
      }
    )
  }

  // obtiene todo el carrito del cliente
  obtener_carrito_cliente(){
    this._clienteService.obtener_carrito_cliente(this.id,this.token).subscribe(
      response =>{
        this.carrito_arr= response;
        this.total_carrito();
      }
    )
  }

  obtener_descuento_activo(){
    this._guestService.obtener_descuento_activo().subscribe(
      response =>{
        this.descuento_activo=response[0];
      },
      error =>{
        console.log(error.message);
      }
    )
  }
}
