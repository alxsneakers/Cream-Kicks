import { Component, ViewChild } from '@angular/core';
import { product, ProductService } from 'src/app/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  /*
  columnsDisplay: string[]= ['select', 'model', 'brand', 'uid']; // nombre columnas
  data: any; // datos de la tabla
  selection: any; 
  searchValue: string; // guarda el valor del input (buscador)
  @ViewChild(MatPaginator) paginator: MatPaginator;


  

  

  // Cuando carge el componente pinta la informacion en la tabla.
  constructor(private productSvc: ProductService) {
    this.productSvc.allProducts().subscribe(x =>{
      this.data= new MatTableDataSource<product>(x);
      this.selection= new SelectionModel<product>(true, []);
      this.data.paginator= this.paginator;
    })
  }



  // Filtra la informacion de la tabla.
  applyFilter(event: Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.data.filter= filterValue.trim().toLowerCase();
    if(this.data.paginator){
      this.data.paginator.firstPage();
    }
  }


  // Si el numero de elementos seleccionados coincide con el numero total de filas.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.data.length;
    return numSelected === numRows;
  }


  /* Selecciona todas las filas si no estan todas seleccionadas; de lo contrario
      borra la seleccion. 
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.data.data);
  }

  // La etiqueta de la casilla de verficacion en la fila pasada.
  checkboxLabel(row?: product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.model + 1}`;
  }
}
*/
}
