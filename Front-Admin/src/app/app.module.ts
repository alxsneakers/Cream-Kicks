import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import {MatTabsModule} from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatMenuModule} from '@angular/material/menu';  
import { MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';


// graficos in real time
import { NgxChartsModule } from '@swimlane/ngx-charts';


//MatNativeDateModule, MatMomentDateModule
import { MatNativeDateModule } from '@angular/material/core';

// animaciones del navegador
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// peticiones http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// cookie serivice
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
// componentes
import { LoginErrorComponent } from './components/login/login-error/login-error.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatInputModule } from '@angular/material/input';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import {MatCardModule} from '@angular/material/card';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { IonicModule } from '@ionic/angular'; 
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupones/index-cupon/index-cupon.component';
import { UpdateCuponComponent } from './components/cupones/update-cupon/update-cupon.component';
import { GaleriaProductComponent } from './components/products/galeria-product/galeria-product.component';
import { DragDirective } from './directives/drag.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CreateMarcaComponent } from './components/añadir/create-marca/create-marca.component';
import { IndexMarcaComponent } from './components/añadir/index-marca/index-marca.component';
import { CreateDescuentoComponent } from './components/descuentos/create-descuento/create-descuento.component';
import { UpdateDescuentoComponent } from './components/descuentos/update-descuento/update-descuento.component';
import { IndexDescuentoComponent } from './components/descuentos/index-descuento/index-descuento.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { CuponEffects } from './state/effects/cupon.effects';
import {MatStepperModule} from '@angular/material/stepper';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { DescuentoEffects } from './state/effects/descuento.effects';
import { NotFoundItemComponent } from './components/not-found-item/not-found-item.component';
import { IndexContactoComponent } from './components/contacto/index-contacto/index-contacto.component';
import { ContactoEffects } from './state/effects/contactos.effects';
import { ProductoEffects } from './state/effects/producto.effects';
import { AuthEffects } from './state/effects/auth.effects';
import { MarcaEffects } from './state/effects/marca.effects';
import { FilterMensajesPipe } from './pipes/filter-mensajes.pipe';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ConfirmBorrarCuentaComponent } from './components/configuracion/confirm-borrar-cuenta/confirm-borrar-cuenta.component';
import { IndexClientesComponent } from './components/clientes/index-clientes/index-clientes.component';
import { ClienteEffects } from './state/effects/cliente.effects';
import { ComprasComponent } from './components/clientes/compras/compras.component';
import { DetalleCompraComponent } from './components/clientes/detalle-compra/detalle-compra.component';
import { GraficoVentasComponent } from './components/dashboard/graficos/grafico-ventas/grafico-ventas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginErrorComponent,
    SidenavComponent,
    BodyComponent,
    SublevelMenuComponent,
    NotFoundComponent,
    DashboardComponent,
    NavbarComponent,
    CreateProductComponent,
    IndexProductComponent,
    UpdateProductComponent,
    ConfirmDialogComponent,
    CreateCuponComponent,
    IndexCuponComponent,
    UpdateCuponComponent,
    GaleriaProductComponent,
    DragDirective,
    CreateMarcaComponent,
    IndexMarcaComponent,
    CreateDescuentoComponent,
    UpdateDescuentoComponent,
    IndexDescuentoComponent,
    ProductFormComponent,
    NotFoundItemComponent,
    IndexContactoComponent,
    FilterMensajesPipe,
    ConfiguracionComponent,
    ConfirmBorrarCuentaComponent,
    IndexClientesComponent,
    ComprasComponent,
    DetalleCompraComponent,
    GraficoVentasComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    NgxDropzoneModule,
    MatMenuModule,
    IonicModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'test'}),
    EffectsModule.forRoot([CuponEffects, DescuentoEffects, ContactoEffects, ProductoEffects, AuthEffects, MarcaEffects, ClienteEffects]),
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatExpansionModule,
    NgxChartsModule
  
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [CookieService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
