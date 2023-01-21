import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectListDescuentos, selectLoadingDescuentos } from 'src/app/state/selectors/descuento.selectors';
import { deleteDescuento, loadDescuentos, deleteManyDescuento } from 'src/app/state/actions/descuento.actions';
import { MatTableDataSource } from '@angular/material/table';
import { DescuentoModel, DescuentoTable } from 'src/app/models/descuento.interface';
import { DescuentoService } from 'src/app/services/descuento.service';
import { SelectionModel } from '@angular/cdk/collections';
import { deleteManyCupon } from 'src/app/state/actions/cupon.actions';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-index-descuento',
  templateUrl: './index-descuento.component.html',
  styleUrls: ['./index-descuento.component.scss']
})
export class IndexDescuentoComponent implements OnInit {


  // variables
  loading$: Observable<boolean>= new Observable()
  descuentos$: Observable<any>= new Observable()
  columnsDisplay: string[]= ['select', 'banner', 'titulo', 'descuento', 'estado' ,'duracion', 'funciones']; // nombre de las columnas
  data: any;
  selection= new SelectionModel<DescuentoModel>(true, []);
  searchValue: string; // guarda el valor del input
  @ViewChild(MatPaginator) paginator: MatPaginator;
  url: string;
  estados: String[]=[];
  
  
  constructor(public dialog: MatDialog, private store: Store<any>, private descuentoSvc: DescuentoService) {
    this.url='http://localhost:4201/api/descuentos/obtenerBanner/'
   }

  ngOnInit(): void {
    this.loading$= this.store.select(selectLoadingDescuentos);
    this.store.dispatch(loadDescuentos()); // llama a la accion
    this.loadDescuentos();
  }

  // pinta la tabla
  loadDescuentos(): void{
    this.descuentos$= this.store.select(selectListDescuentos); // recupero los descuentos
    this.descuentos$.subscribe(descuento =>{
      this.data= new MatTableDataSource<DescuentoModel>(descuento);
      this.data.paginator= this.paginator;
      descuento.forEach(element =>{
        // paso las fecha al formato timestamp | Más info: https://www.unixtimestamp.com/
        let tt_inicio= Date.parse(this.convertir_fecha(element.fecha_inicio) + 'T00:00:00')/1000; 
        let tt_fin= Date.parse(this.convertir_fecha(element.fecha_fin) + 'T23:59:59')/1000; 
        let tt_today= Date.parse(new Date().toString())/1000;

        console.log(tt_inicio, tt_fin, tt_today);
        
        if(tt_today > tt_inicio && tt_today < tt_fin){
          this.estados.push('Finalizada');
        }else if(tt_today < tt_inicio){
          this.estados.push('Proximamente');
        }else if(tt_today > tt_inicio && tt_today < tt_fin){
          this.estados.push('En progreso');
          console.log('En progresp');
        }
      })
      
     

      console.log(this.estados);
      
    });
    
  }


  deleteDescuento(id){
    this.store.dispatch(deleteDescuento({id}));
  }

  deleteManyDescuento(){
    let idDescuentos: string[]= []; // guardo los id de las marcas seleccionadas.
    this.selection.selected.map(descuento => idDescuentos.push(descuento._id))
    this.store.dispatch(deleteManyDescuento({idDescuentos}));
  }


  openDialog(nombre, id): void{
    const dialogRef= this.dialog.open(ConfirmDialogComponent, {
      width: '512px',
      data: { // envio los datos al dialog
        titulo: 'descuento',
        nombre: nombre,
        genero: 'el',
      }
    });
    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      if(res){
        this.deleteDescuento(id);
      }
    });
  }

  openDialogMany(): void{
    const dialogRef= this.dialog.open(ConfirmDialogComponent, {
      width: '512px',
      data: { // envio los datos al dialog
        titulo: 'descuentos',
        genero: 'los',
      }
    });
    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      if(res){
        this.deleteManyDescuento();
      }
    });
  }


  convertir_fecha(fecha){
    let newDate;
    const date= new Date(fecha);
    let day= date.getDate().toString();
    let month= date.getMonth() + 1;
    let year= date.getFullYear();

    if(parseInt(day) < 10){
        day= '0'+day;
    }
    
    if(month < 10){
        newDate= `${year}-0${month}-${day}`;
    }else{
        newDate= `${year}-${month}-${day}`;
    }
    return newDate;
  }

  // filtra la informacion de la tabla.
  applyFilter(event: Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.data.filter= filterValue.trim().toLowerCase();
    if(this.data.paginator){
      this.data.paginator.firstPage();
    }
  }


  // --------- METODOS DE COLUMNA SELECT ----------------------

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

  checkboxLabel(row?: DescuentoTable): string{
    if(!row){
      return `${this.isAllSelected() ? 'deselect': 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.index + 1}`
  }
}
