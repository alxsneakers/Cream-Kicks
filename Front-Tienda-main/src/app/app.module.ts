import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import {  }
import { routing } from './app.routing';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { SiderbarComponent } from './components/usuario/siderbar/siderbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './components/notification/notification.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { ShowProductoComponent } from './components/productos/show-producto/show-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DireccionesComponent } from './components/usuario/direcciones/direcciones.component';
import { DireccionErrorComponent } from './components/usuario/direcciones/direccion-error/direccion-error.component';
import { DescuentoPipe } from '../pipes/descuento.pipe';
import { ContactoComponent } from './components/contacto/contacto.component';
import { IndexPedidosComponent } from './components/usuario/pedidos/index-pedidos/index-pedidos.component';
import { DetallePedidoComponent } from './components/usuario/pedidos/detalle-pedido/detalle-pedido.component';
import { BarRatingModule } from "ngx-bar-rating";
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    PerfilComponent,
    SiderbarComponent,
    NotificationComponent,
    IndexProductoComponent,
    ShowProductoComponent,
    CarritoComponent,
    DireccionesComponent,
    DireccionErrorComponent,
    DescuentoPipe,
    ContactoComponent,
    IndexPedidosComponent,
    DetallePedidoComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BarRatingModule,
    routing,
    BrowserAnimationsModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
