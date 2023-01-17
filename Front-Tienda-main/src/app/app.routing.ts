import { Routes, RouterModule } from '@angular/router';
import { Component, ModuleWithProviders } from '@angular/core';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { AuthGuard } from "./guards/auth.guard";
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { ShowProductoComponent } from './components/productos/show-producto/show-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DireccionesComponent } from './components/usuario/direcciones/direcciones.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { IndexPedidosComponent } from './components/usuario/pedidos/index-pedidos/index-pedidos.component';
import { DetallePedidoComponent } from './components/usuario/pedidos/detalle-pedido/detalle-pedido.component';

const appRoute : Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: LoginComponent},

    // -------------------------  RUTAS PROTEGIDAS ---------------------------
    {path: 'cuenta/perfil', component: PerfilComponent, canActivate:[AuthGuard]},
    {path: 'cuenta/pedidos', component: IndexPedidosComponent, canActivate:[AuthGuard]},
    {path: 'cuenta/pedidos/:id', component: DetallePedidoComponent, canActivate:[AuthGuard]},
    {path: 'cuenta/direcciones', component: DireccionesComponent, canActivate:[AuthGuard]},
    {path: 'carrito', component: CarritoComponent, canActivate:[AuthGuard]},


    // -------------------------  RUTAS PUBLICAS ---------------------------
    {path: 'productos', component: IndexProductoComponent},
    {path: 'productos/marca/:marca', component: IndexProductoComponent},
    {path: 'productos/:id', component: ShowProductoComponent},
    {path: 'contacto', component: ContactoComponent}
]

export const AppRoutingPorviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
