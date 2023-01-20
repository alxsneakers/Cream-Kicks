import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store'; // ngrx (redux)
import { Observable } from 'rxjs';
import { CuponModel } from 'src/app/models/cupon.interface';
import { CuponTable } from 'src/app/models/cupon.state';
import { CuponService } from 'src/app/services/cupon.service';
import { NotificationService } from 'src/app/services/notification.service';
import { loadCoupons, deleteCupon, deleteManyCupon } from 'src/app/state/actions/cupon.actions';
import {
  selectListItems,
  selectLoading,
} from 'src/app/state/selectors/cupon.selectors';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { CreateCuponComponent } from '../create-cupon/create-cupon.component';



@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.scss'],
})
export class IndexCuponComponent implements OnInit {
  // Variables
  loading$: Observable<boolean> = new Observable();
  coupons$: Observable<any> = new Observable();
  columnsDisplay: string[] = ['codigo', 'tipo', 'valor', 'limite', 'funciones']; // nombre de las columnas
  data: any;
  selection= new SelectionModel<CuponTable>(true, []);
  searchValue: string; // guarda el valor del input.
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private store: Store<any>,
    private notificationSvc: NotificationService,
    private cuponSvc: CuponService,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
    this.store.dispatch(loadCoupons()); // llama a la accion
    this.loadCupones();
  }

  // pinta la tabla
  loadCupones(): void {
    this.coupons$ = this.store.select(selectListItems);
    this.coupons$.subscribe((coupon) => {
      this.data = new MatTableDataSource<CuponModel>(coupon);
      this.data.paginator = this.paginator;
    });
  }

  // borra un cupon
  borrarCupon(id){
    this.store.dispatch(deleteCupon({id}))
  }

  deleteManyCupon(){
    let idCupones: string[]= []; // guardo los id de los cupones seleccionados.
    this.selection.selected.map(cupon => idCupones.push(cupon._id))
    this.store.dispatch(deleteManyCupon({idCupones}));
  }

  // filtra la informacion de la tabla.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  // abre el modal, para eliminar un cupon.
  DialogConfirmar(nombre, id): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '512px',
      
      data: {
        // envio los datos al dialog
        titulo: 'cupon',
        nombre: nombre,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        //this.borrarCupon(id);
      }
    });
  }

  DialogAgregarCupon(): void{
    const dialogRef = this.dialog.open(CreateCuponComponent,{
      width: '512px',
    });

    // dialogRef.afterClosed().subscribe((res) => {
    //   console.log(res);
    //   if (res) {
    //     this.cuponSvc.createCupon();
    //   }
    // });
    
  }
  


}
