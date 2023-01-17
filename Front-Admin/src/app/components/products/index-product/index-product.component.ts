import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { product, ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Workbook } from 'exceljs';
import * as fs from "file-saver";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoadingDeleteManyProducto, selectListProductos, selectLoadingProductos } from 'src/app/state/selectors/producto.selectors';
import { loadProductos, deleteManyProducto, deleteProducto } from 'src/app/state/actions/producto.actions';
import { ProductoModel } from 'src/app/models/producto.interface';
import { SelectionModel } from '@angular/cdk/collections';
// https://stackoverflow.com/questions/17826082/how-to-delete-multiple-ids-in-mongodb


export interface ProductoTable {
  portada: string,
  nombre: string,
  sku: string,
  marca: string
  publicado: boolean
  index: number;
  _id: string;
}

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.scss']
})
export class IndexProductComponent implements OnInit {


  // Variables
  loading$: Observable<boolean>;
  loadingDelete$: Observable<boolean>;
  productos$: Observable<any>= new Observable()
  columnsDisplay: string[]= ['select', 'portada', 'nombre', 'marca', 'stock', 'funciones']; // nombre de las columnas
  data: any;
  selection= new SelectionModel<ProductoModel>(true, []);
  searchValue: string; // guarda el valor del input.
  @ViewChild(MatPaginator) paginator: MatPaginator;
  url: any;
  productos_excel: Array<any>= [];

  constructor(private productSvc: ProductService, public dialog: MatDialog, private store: Store<any>) {
    this.url= 'http://localhost:4201/api/products/';
   }

  ngOnInit(): void {
    this.loading$= this.store.select(selectLoadingProductos);
    this.loadingDelete$= this.store.select(selectIsLoadingDeleteManyProducto);
    this.store.dispatch(loadProductos());
    this.printProductos();
  }

  // pinta la tabla
  printProductos(): void{
    this.productos$= this.store.select(selectListProductos);
    this.productos$.subscribe(x =>{
      this.data= new MatTableDataSource<ProductoModel>(x);
      this.data.paginator= this.paginator;
      x.forEach(element =>{ // rellena el array para el excel
        this.productos_excel.push({
          nombre: element.nombre,
          marca: element.marca,
          tallas: element.tallas,
          sku: element.sku
        });
      })
    });
  }

  // filtra la informacion de la tabla.
  applyFilter(event: Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.data.filter= filterValue.trim().toLowerCase();
    if(this.data.paginator){
      this.data.paginator.firstPage();
    }
  }


  deleteManyProducto(){
    let idsProducto: string[]= [];
    this.selection.selected.map(producto => idsProducto.push(producto._id));
    this.store.dispatch(deleteManyProducto({idsProducto}));
  }




  // abre el modal, para eliminar un producto.
  openDialog(nombre, id): void{
    const dialogRef= this.dialog.open(ConfirmDialogComponent, {
      width: '512px',
      data: { // envio los datos al dialog
        titulo: 'producto',
        nombre: nombre,
        validacion: 'ok',
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      if(res){
        this.store.dispatch(deleteProducto({id: id}));
      }
    });
  }

  donwload_excel(){
    const workbook= new Workbook();
    const worksheet= workbook.addWorksheet('Reporte Productos');
    worksheet.addRow(undefined);

    for (let x1 of this.productos_excel) {
      const x2= Object.keys(x1);
      const temp= [];
      for(let y of x2){
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }
    const fname= 'REPO01 ';
    // añado las columnas del excel
    worksheet.columns= [
      {header: 'Nombre', key: 'col1', width: 30},
      {header: 'Marca', key: 'col2', width: 30},
      {header: 'Tallas', key: 'col3', width: 30},
      {header: 'SKU', key: 'col4', width: 30}
    ] as any;

    // creo el archivo para exportarlo
    workbook.xlsx.writeBuffer().then((data =>{
      let blod= new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blod, fname+'-'+new Date().valueOf()+'.xlsx');
    }))
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
  
    checkboxLabel(row?: ProductoTable): string{
      if(!row){
        return `${this.isAllSelected() ? 'deselect': 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.index + 1}`
    }





}
