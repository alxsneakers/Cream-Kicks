import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// componentes
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


// UserGuard
import { UserGuard } from './guards/user.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupones/index-cupon/index-cupon.component';
import { UpdateCuponComponent } from './components/cupones/update-cupon/update-cupon.component';
import { GaleriaProductComponent } from './components/products/galeria-product/galeria-product.component';
import { CreateMarcaComponent } from './components/añadir/create-marca/create-marca.component';
import { CreateDescuentoComponent } from './components/descuentos/create-descuento/create-descuento.component';
import { IndexDescuentoComponent } from './components/descuentos/index-descuento/index-descuento.component';
import { UpdateDescuentoComponent } from './components/descuentos/update-descuento/update-descuento.component';
import { IndexContactoComponent } from './components/contacto/index-contacto/index-contacto.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { IndexClientesComponent } from './components/clientes/index-clientes/index-clientes.component';
import { ComprasComponent } from './components/clientes/compras/compras.component';
import { DetalleCompraComponent } from './components/clientes/detalle-compra/detalle-compra.component';
import { NotLoginGuard } from './guards/not-login.guard';
import { IndexPedidoComponent } from './components/pedidos/index-pedido/index-pedido.component';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserGuard]},
  { path: 'productos',component: IndexProductComponent, canActivate: [UserGuard]},
  { path: 'cupones',component: IndexCuponComponent, canActivate: [UserGuard]},
  { path: 'descuentos', component: IndexDescuentoComponent, canActivate: [UserGuard]},
  { path: 'contactos', component: IndexContactoComponent, canActivate: [UserGuard]},
  { path: 'cuenta', component: ConfiguracionComponent,  canActivate: [UserGuard]},
  { path: 'clientes', component: IndexClientesComponent, canActivate: [UserGuard]},
  { path: 'pedidos', component: IndexPedidoComponent, canActivate: [UserGuard]},
  { path: 'clientes/compras/:id', component: ComprasComponent, canActivate: [UserGuard]},
  { path: 'clientes/detalleCompra/:id', component: DetalleCompraComponent, canActivate: [UserGuard]},
  { path: 'productos/registro', component: CreateProductComponent, canActivate: [UserGuard]},
  { path: 'cupones/registro', component: CreateCuponComponent, canActivate: [UserGuard]},
  { path: 'marcas/registro',component: CreateMarcaComponent, canActivate: [UserGuard] },
  { path: 'descuentos/registro', component: CreateDescuentoComponent, canActivate: [UserGuard] },
  { path: 'productos/galeria/:id', component: GaleriaProductComponent, canActivate: [UserGuard] },
  { path: 'cupones/:id', component: UpdateCuponComponent, canActivate: [UserGuard] },
  { path: 'productos/:id',component: UpdateProductComponent, canActivate: [UserGuard] },
  { path: 'descuentos/:id', component: UpdateDescuentoComponent, canActivate: [UserGuard] },
  { path: '', component: LoginComponent, canActivate: [NotLoginGuard]},
  { path: '**', component: NotFoundComponent },
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
