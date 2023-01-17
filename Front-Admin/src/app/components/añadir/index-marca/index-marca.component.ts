import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MarcaModel } from 'src/app/models/marca.interface';
import { marca, MarcaService } from 'src/app/services/marca.service';
import { NotificationService } from 'src/app/services/notification.service';
import { loadMarcas, deleteMarca, deleteManyMarca  } from 'src/app/state/actions/marca.actions';
import { selectListMarcas, selectLoadingMarcas, selectIsLoadingDeleteManyMarcas } from 'src/app/state/selectors/marca.selectors';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';


export interface MarcaTable {
  nombre: string;
  index: number;
  _id: string;
}


@Component({
  selector: 'app-index-marca',
  templateUrl: './index-marca.component.html',
  styleUrls: ['./index-marca.component.scss']
})
export class IndexMarcaComponent implements OnInit {

  // variables
  isError$: Observable<string | null>;
  loading$: Observable<boolean>;
  loadingDelete$: Observable<boolean>;
  marcas$: Observable<any>= new Observable();
  columnsDisplay: string[]= ['select', 'nombre', 'funciones']; // nombre de las columnas
  data: any;
  selection= new SelectionModel<MarcaModel>(true, []);
  searchValue: string; // guarda el valor del input.

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private store: Store<any>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading$= this.store.select(selectLoadingMarcas);
    this.loadingDelete$= this.store.select(selectIsLoadingDeleteManyMarcas);
    this.store.dispatch(loadMarcas());
    this.printMarcas();
  }

  printMarcas(): void{
    this.marcas$= this.store.select(selectListMarcas);
    this.marcas$.subscribe(marca =>{
      this.data= new MatTableDataSource<MarcaModel>(marca);
      this.data.paginator= this.paginator;
    })
  }

  // si el numero de marcas seleccionadas es igual al numero de filas.
  isAllSelected(){
    const numSelected= this.selection.selected.length;
    const numRows= this.data.data.length;
    return numSelected === numRows;
  }

  // selecciona todas las marcas o las deselecciona
  toggleAllRows(){
    if(this.isAllSelected()){
      this.selection.clear();
      return;
    }
    this.selection.select(...this.data.data);
  }

  checkboxLabel(row?: MarcaTable): string{
    if(!row){
      return `${this.isAllSelected() ? 'deselect': 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.index + 1}`
  }




  // filtra la informacion de la tabla.
  applyFilter(event: Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.data.filter= filterValue.trim().toLowerCase();
    if(this.data.paginator){
      this.data.paginator.firstPage();
    }
  }

  // borra una marca
  deleteMarca(id){
    this.store.dispatch(deleteMarca({id}));
  }


  deleteManyMarca(){
    let idsMarcas: string[]= []; // guardo los id de las marcas seleccionadas.
    this.selection.selected.map(marca => idsMarcas.push(marca._id))
    this.store.dispatch(deleteManyMarca({idsMarcas}));
  }

  // escriba el nombre para confirmar
  // abre el modal, para eliminar una marca.
  openDialog(nombre, id): void{
    const dialogRef= this.dialog.open(ConfirmDialogComponent, {
      width: '512px',
      data: { // envio los datos al dialog
        titulo: 'marca',
        nombre: nombre,
        validacion: 'ok',
        genero: 'la',
        cuerpo: 'escriba ok para confirmar'
      }
    });
    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      if(res){
        this.deleteMarca(id);
      }
    });
  }

  openDialogMany(): void{
    const dialogRef= this.dialog.open(ConfirmDialogComponent, {
      width: '512px',
      data: { // envio los datos al dialog
        titulo: 'marcas',
        validacion: 'ok',
        genero: 'las',
        cuerpo: 'escriba ok para confirmar'
      }
    });
    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      if(res){
        this.deleteManyMarca();
      }
    });
  }
}
