import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClienteService, Producto } from "src/app/services/cliente.service";
import { GLOBAL } from "src/app/services/GLOBAL";
import { GuestService } from "src/app/services/guest.service";
import { NotificationService } from "src/app/services/notification.service";
declare const tns; //  time-slider
declare const lightGallery;
import { io } from "socket.io-client";

@Component({
  selector: "app-show-producto",
  templateUrl: "./show-producto.component.html",
  styleUrls: ["./show-producto.component.css"],
})
export class ShowProductoComponent implements OnInit {
  // Variables
  public token;
  public idProducto;
  public producto: any = {};
  public stock;
  public url;
  public productos_rec: Array<any> = []; // productos recomendados
  public tipos_envio: Array<any> = [];
  public socket = io("http://localhost:4201");
  public descuento_activo: any = {};
  public recomendados: Array<any> = [];

  /* precargador de la peticion con el back, boton (agregar carrito)
    more info: https://cssloaders.github.io/
  */
  public loader_carrito = false; //  //
  public carrito_data: any = {
    talla: "",
    cantidad: 1, // solo se permite una compra de par por cliente
  };

  constructor(
    private _route: ActivatedRoute,
    private _guestService: GuestService,
    private _notificationService: NotificationService,
    private _clienteService: ClienteService
  ) {
    this.url = GLOBAL.url;
    this.token = localStorage.getItem("token");

    // obtiene el id del producto a partir del parametro de la url
    this._route.params.subscribe((params) => {
      this.idProducto = params["id"];
    });

    // obtiene la informacion del producto
    this._guestService
      .obtener_producto_publico(this.idProducto)
      .subscribe((response) => {
        this.producto = response;
        console.log(this.producto);
        // carga los productos recomendados segun la marca del producto que el usuario esta viendo
        this._guestService
          .listar_productos_recomendados_publico(this.producto.marca)
          .subscribe((response) => {
            this.productos_rec = response;
          });
      });
  }

  ngOnInit(): void {
    // categoria recomendados
    this.obtenerRecomendados();

    // obtiene el listado de tipos de envios
    this.get_tipos_envio();
    this.obtener_descuento_activo();
    /* inicia el slider de imagenes del producto
      - more info: https://github.com/ganlanyuan/tiny-slider
      -            https://github.com/sachinchoolur/lightgallery.js */
    setTimeout(() => {
      tns({
        container: ".cs-carousel-inner",
        controlsText: [
          '<i class="cxi-arrow-left"></i>',
          '<i class="cxi-arrow-right"></i>',
        ],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
        gutter: 15,
      });

      // inicia la galeria de las imagenes
      const e = document.querySelectorAll(".cs-gallery");
      if (e.length) {
        for (let t = 0; t < e.length; t++) {
          lightGallery(e[t], {
            selector: ".cs-gallery-item",
            download: !1,
            videojs: !0,
            youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 },
            videoPlayerParams: {
              byline: 0,
              portrait: 0,
            },
          });
        }
      }

      // inicia el slider de productos recomendados
      tns({
        container: ".cs-carousel-inner-two",
        controlsText: [
          '<i class="cxi-arrow-left"></i>',
          '<i class="cxi-arrow-right"></i>',
        ],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        nav: false,
        controlsContainer: "#custom-controls-related",
        responsive: {
          0: {
            items: 1,
            gutter: 20,
          },
          480: {
            items: 2,
            gutter: 24,
          },
          700: {
            items: 3,
            gutter: 24,
          },
          1100: {
            items: 4,
            gutter: 30,
          },
        },
      });
    }, 500);
  }

  agregar_producto() {
    // valida el formularios
    if (this.carrito_data.talla) {
      // obtiene los datos del carritos
      const data = {
        producto: this.producto._id,
        cliente: localStorage.getItem("_id"),
        talla: this.carrito_data.talla,
      };
      this.loader_carrito = true; // empieza la peticion
      this._clienteService.agregar_carrito_cliente(data, this.token).subscribe(
        (response) => {
          this.loader_carrito = false; // acaba la peticion
          this.socket.emit("add-carrito", { data: true }); // receptor
          this._notificationService.openSnackBar(response.message, "cerrar");
        },
        (error) => {
          // producto duplicado en el carrito
          this.loader_carrito = false; // acaba la peticion por un error.
          this._notificationService.openSnackBar(error.error.message, "cerrar");
        }
      );
    } else {
      this._notificationService.openSnackBar(
        "Debes de seleccionar una talla.",
        "cerrar"
      );
    }
  }

  // obtiene todos los tipo de envios
  get_tipos_envio() {
    this._clienteService.obtener_tipo_envios().subscribe((response) => {
      this.tipos_envio = response;
    });
  }

  obtener_descuento_activo() {
    this._guestService.obtener_descuento_activo().subscribe(
      (response) => {
        this.descuento_activo = response[0];
        console.log(this.descuento_activo);
      },
      (error) => {
        this.descuento_activo = null;
        console.log(error.message);
      }
    );
  }

  onChangeTalla(value: any) {
    this._clienteService
      .obtener_stock_talla(this.idProducto, value.target.value)
      .subscribe((response) => {
        this.stock = response;
      });
  }

  // recomendados
  obtenerRecomendados(): void {
    this._clienteService.obtener_ultimos_productos().subscribe((response) => {
      this.recomendados = response;
    });
  }
}
