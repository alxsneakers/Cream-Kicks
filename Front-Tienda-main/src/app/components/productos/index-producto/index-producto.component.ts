import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService, Producto } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { GuestService } from '../../../services/guest.service';
declare const StickySidebar; // mantiene independiente del scroll del raton
declare const noUiSlider;
declare const $: any; // jquery

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  // VARIABLES
  public valueSearch: string= '';
  public hasQuey: Boolean= false;
  public marcas: Array<{nombre: string, cantidad: number}>= [];
  public filter_marca= '';
  public productos: Array<any>= [];
  public filter_producto= '';
  public load_data= true;
  public url;
  public filter_cat_productos= 'todos'; // todos por defecto
  public route_marca;
  public page= 1;
  public pageSize=15;
  public sort_by= 'Defecto';
  public descuento_activo: any= {};


  constructor(private _clientService: ClienteService, private _route: ActivatedRoute, private _guestService: GuestService) {
    this.url= GLOBAL.url;

   
  
    // filtra los productos por marca desde el menu superior.
    this._route.params.subscribe(
      params =>{
        this.route_marca= params['marca']; // obtiene la marca por url http://localhost:4200/productos/marca/[nike]
        if(this.route_marca){
          this._clientService.listar_productos_publico('').subscribe(
            res =>{
           
              this.productos= res; // reseteo
              this.productos= this.productos.filter(item => item.marca == this.route_marca);
              this.load_data= false;
            }
          );
        }else{
          this._clientService.listar_productos_publico('').subscribe(
            res =>{
              this.productos= res;
              this.load_data= false;
            }
          );
        }
      }
    )
    
    // obtiene todos los productos
    this._clientService.listar_productos_publico(this.filter_producto).subscribe(
      reponse =>{
        console.log(reponse);
        this.productos= reponse;
        this.load_data= false;
      }
    );
   }

  ngOnInit(): void {
    this.obtener_descuento_activo();
    this.getMarcas();
    
    
    

    setTimeout(() => {
      const sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20});
    })
    

    


    // script para el funcionamiento del slider.
    const slider : any = document.getElementById('slider');
    noUiSlider.create(slider, {
        start: [0, 1000],
        connect: true,
        range: {
            'min': 0,
            'max': 1000
        },
        tooltips: [true,true],
        pips: {
          mode: 'count', 
          values: 5,
          
        }
    })
    slider.noUiSlider.on('update', function (values) {
        $('.cs-range-slider-value-min').val(values[0]);
        $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');
  }


  getMarcas(){
    this._clientService.obtener_marcas().subscribe(
      response =>{  
        response.forEach(element => {
          this._clientService.obtener_cantidad_marca(element.nombre).subscribe(
            response =>{
              this.marcas.push({nombre: element.nombre, cantidad: response});   
            }
          )
        });
      }
    );
  }


  sendData(event: any){
    let query: string= event.target.value;
    // si no se ha encontrado ningun resltado o es todo espacios
    let matchSpaces: any= query.match(/\s*/);
    if(matchSpaces[0] === query){
      this.hasQuey= false;
      return;
    }
    this._clientService.searchProductos(query.trim()).subscribe(results => {
      this.productos=results;
      this.hasQuey= true;
      console.log(results);
      
    })
  }

 
 

  // obtiene los precios del slider
  buscar_precios(){
    this._clientService.listar_productos_publico(this.filter_producto).subscribe(
      reponse =>{
        console.log(reponse);
        this.productos= reponse;
        const min= parseInt($('.cs-range-slider-value-min').val());
        const max= parseInt($('.cs-range-slider-value-max').val());

        this.productos= this.productos.filter((item)=>{
          return item.precioVenta >= min && item.precioVenta <= max
        });
      }
    ); 
  }

  // busca la marca a partir de los checkboxs
  buscar_por_marca(){
    if(this.filter_cat_productos.toLocaleLowerCase() == 'todos'){
      this._clientService.listar_productos_publico(this.filter_producto).subscribe(
        res =>{
          this.productos= res;
          this.load_data= false;
          this.valueSearch=''; // limpio el buscador
        }
      );
    }else{
      this._clientService.listar_productos_publico(this.filter_producto).subscribe(
        res =>{
          this.productos= res;
          this.productos= this.productos.filter(item => item.marca.toLocaleLowerCase() == this.filter_cat_productos.toLocaleLowerCase());
          this.load_data= false;
          this.valueSearch=''; // limpio el buscador
        }
      ); 
    }
  }

  // devuelve todos los productos
  reset_productos(){
    this.filter_producto=''; // reseteo el filtro
    this.valueSearch=''; // limpio el valor del input del buscador
    this._clientService.listar_productos_publico('').subscribe(
      res =>{
        this.productos= res;
        this.load_data= false;
        
      }
    );
  }

  // ordena los productos por distintos filtros
  orden_por(){
    if(this.sort_by == 'Defecto'){
      this._clientService.listar_productos_publico('').subscribe(
        res =>{
          this.productos= res;
          this.load_data= false;
        }
      ); // ordena por numero de ventas, campo (nventas)
    }else if(this.sort_by == 'Popularidad'){
      this.productos.sort(function (a, b){
        if(a.nventas < b.nventas){
          return 1;
        }else if( a.nventas > b.nventas){
          return -1;
        }
        return 0;
      }); // ordena por el campo (precioVenta)
    }else if(this.sort_by == '+-Precio'){
      this.productos.sort(function (a, b){
        if(a.precioVenta < b.precioVenta){
          return 1;
        }else if( a.precioVenta > b.precioVenta){
          return -1;
        }
        return 0;
      }); // ordena por el campo (precioVenta)
    }else if(this.sort_by == '-+Precio'){
      this.productos.sort(function (a, b){
        if(a.precioVenta > b.precioVenta){
          return 1;
        }else if( a.precioVenta < b.precioVenta){
          return -1;
        }
        return 0;
      }); // ordena por el campo (nombre)
    }else if(this.sort_by == 'azTitulo'){
      this.productos.sort(function (a, b){
        if(a.nombre > b.nombre){
          return 1;
        }else if( a.nombre < b.nombre){
          return -1;
        }
        return 0;
      }); // ordena por el campo (nombre)
    }else if(this.sort_by == 'zaTitulo'){
      this.productos.sort(function (a, b){
        if(a.nombre < b.nombre){
          return 1;
        }else if( a.nombre > b.nombre){
          return -1;
        }
        return 0;
      });
    }
  }

  obtener_descuento_activo(){
    this._guestService.obtener_descuento_activo().subscribe(
      response =>{
        this.descuento_activo=response[0];
        console.log(this.descuento_activo.palabraClave);
        
      },
      error =>{
        this.descuento_activo= null;
        console.log(error.message);
      }
    )
  }

}
