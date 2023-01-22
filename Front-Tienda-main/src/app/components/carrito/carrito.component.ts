import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from 'socket.io-client';
import { Router } from '@angular/router';
import { GuestService } from 'src/app/services/guest.service';
declare const Cleave; // libreria que valida y formatea tarjetas de credito
declare const StickySidebar; // mantiene la orden total siempre en pantalla independiente del scroll del raton
declare var paypal;

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  @ViewChild('paypalButton', { static: true }) paypalElement!: ElementRef;
  public token;
  public id;
  public url;
  public pago_tarjeta: boolean= true;
  public carrito_arr: Array<any>= []; // guarda todo los productos añadidos al carrito.
  public tipos_envio: Array<any>= [];
  public precio_envio="4"; 
  public subtotal=0; // suma de todos los productos del carrito
  public total_pagar= this.subtotal; // precio final (subtotal + precio_envio)
  public direccion_principal: any= {};
  public socket= io('http://localhost:4201');
  public validate_cupon: any ={}; // guarda la respuesta del back
  public descuento=0; // codigo descuento
  public descuento_activo: any= null; // descuento por promocion
  public venta : any = {};
  public dventa : Array<any> = [];


  constructor(private _clienteService: ClienteService, private _router: Router, private _guestService: GuestService) {

    // obtengo el id y el token del usuario guardado en el localStorage
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url= GLOBAL.url;

   
    
    
    
    // actualiza el carrito cada vez que hace una peticion al backend para eliminar un producto.
    this.socket.on('update-carrito-delete', function(this: CarritoComponent){
      this.obtener_carrito_cliente();
    }.bind(this));
   }


   onChange(event){
    if(event.target.value == 'on'){
      this.pago_tarjeta= false;
    }
   }

   onChange2(event){
    if(event.target.value == 'on'){
      this.pago_tarjeta= true;
    }
   }



   
 

  // calcula el precio total del carrito
  total_carrito(){
    this.subtotal=0;
    if(this.descuento_activo == null){
      this.carrito_arr.forEach(element =>{
        this.subtotal=  this.subtotal + parseInt(element.producto.precioVenta);
      }); // si hay descuento
    }else if(this.descuento_activo != null){
      this.carrito_arr.forEach(element =>{
        // aplico el descuento a los productos necesarios
        if(element.producto.nombre.toLowerCase().includes(this.descuento_activo.palabraClave)){
          let newPrecio= Math.round(parseInt(element.producto.precioVenta) - (parseInt(element.producto.precioVenta)*this.descuento_activo.descuento)/100) ;
          this.subtotal= this.subtotal + newPrecio;
        }else{
          this.subtotal=  this.subtotal + parseInt(element.producto.precioVenta);
        }
        this.calcular_total('');
      });
    }
  }

  // elimina un producto del carrito
  eliminar_item(idItemCarrito){
    this._clienteService.eliminar_carrito_cliente(idItemCarrito,this.token).subscribe(
      response =>{
        this.socket.emit('delete-carrito', {data: response});
        // cada vez que se elimine un producto del carrito, recalculo el carrito.
        this.obtener_carrito_cliente();
      }
    )// si el carrito esta vacio, redirigo al home
    if(this.carrito_arr.length == 1){
      this._router.navigate(['/'])

    }
    
  }

  // obtiene todo el carrito del cliente
  obtener_carrito_cliente(){
    this._clienteService.obtener_carrito_cliente(this.id,this.token).subscribe(
      response =>{
        this.carrito_arr= response;

        // obtiene los datos del objeto dventa.
        this.carrito_arr.forEach(element =>{
          this.dventa.push({
            cliente: this.id,
            producto: element.producto._id,
            precio: element.producto.precioVenta,
            talla: element.talla
          });
        });

      
        this.total_carrito();
        this.calcular_total('');
      }
    );
  }

  // obtiene la direccion principal del cliente
  get_direccion_principal(){
    this._clienteService.obtener_direccion_principal_cliente(this.id,this.token).subscribe(
      response =>{
        this.direccion_principal=response;
        this.venta.direccion= this.direccion_principal._id;
      }
    )
  }

  // obtiene todos los tipo de envios
  get_tipos_envio(){
    this._clienteService.obtener_tipo_envios().subscribe(
      response =>{
        this.tipos_envio= response;
      }
    )
  }


  calcular_total(envio_id: String){
    this.total_pagar= this.subtotal + parseInt(this.precio_envio)
    // guarda los datos de la venta en el objeto venta
    this.venta.subtotal= this.total_pagar;
    this.venta.envio= envio_id;
  }

  validar_cupon(){
    // valido que solo se pueda aplicar un descuento
      if(this.venta.cupon != null){
        this._clienteService.validar_cupon(this.venta.cupon.toLowerCase(),this.token).subscribe(
          response =>{
            
            this.validate_cupon.message= response.message;
            this.validate_cupon.status= response.status;
  
            if(response.data.tipo == 'valorFijo'){
              this.descuento= response.data.valor;
              this.total_pagar= this.total_pagar - this.descuento;
              if(this.total_pagar < 0){ // evitar numeros negativos
                this.total_pagar=0;
              }
            }else if(response.data.tipo == 'porcentaje'){
              this.descuento= (this.total_pagar * response.data.valor) / 100;
              this.total_pagar= this.total_pagar - this.descuento;
              if(this.total_pagar < 0){ // evitar numeros negativos
                this.total_pagar=0;
              }
            }
          },
          error =>{
            this.validate_cupon.message= error.error.error;
            this.validate_cupon.status= error.status;
          }
        )
      }
    
    
    

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

  prueba(){
    this.venta.detalles= this.dventa;
    this.venta.cliente= this.id;
    this.venta.transaccion='tarjetaCredito';

    console.log(this.venta)


    this._clienteService.registro_compra_cliente(this.venta, this.token).subscribe(
      response =>{

        // enviar correo del compra
        this._clienteService.enviar_correo_compra(response.idVenta,this.token).subscribe(
          next =>{ // correo enviado
            this._router.navigate(['/']);
          }
        )
      })
  }




  ngOnInit(): void {
    // informacion obtenida desde backend
    this.obtener_carrito_cliente();
    this.obtener_descuento_activo();
    this.get_direccion_principal();
    this.get_tipos_envio();



    setTimeout(() =>{ 
      new Cleave('#cc-number', { // valida el numero tarjeta credito
        creditCard: true,
          onCreditCardTypeChanged: function (type) {
              // update UI ...
          }
      });
      new Cleave('#cc-exp-date', { // valida fecha expiracion
        date: true,
        datePattern: ['m', 'y']
      });
      const sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20});
    });   

    // inicializa paypal
    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01'
            }
          }]
        });
      }, // compra completada
      onApprove: async (data, actions) => {
       const order= await actions.order.capture();
       this.venta.transaccion= order.purchase_units[0].payments.captures[0].id;
       this.venta.detalles= this.dventa;
       this.venta.cliente= this.id;
       // registro en la bdd
       this._clienteService.registro_compra_cliente(this.venta,this.token).subscribe(
        response =>{
          // enviar correo del compra
          this._clienteService.enviar_correo_compra(response.idVenta,this.token).subscribe(
            next =>{ // correo enviado
              this._router.navigate(['/']);
            }
          )
        }
       )
       console.log(this.venta);
       
      }
    }).render(this.paypalElement.nativeElement);
  }

  onlyNumbers(event): boolean{
    const charCode= (event.which)?event.which: event.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
    }
    return true;
  }



  
}
