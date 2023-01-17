import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, MinLengthValidator, MinValidator, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { timeStamp } from 'console';
import { NotificationService } from 'src/app/services/notification.service';
import { MarcaService } from 'src/app/services/marca.service';
import { FormTallaStockService } from 'src/app/services/form-talla-stock.service';

export interface Talla{
  value: string
}



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {


  form1= new FormGroup({});


  // variables
  checked: boolean= false;
  displayedColumns: string[] = ['talla', 'stock'];
  separatorKeysCodes= [ENTER, COMMA] as const;
  listaMarcas: Array<any>=[];
  tallasSelect: string[]=[];
  stockSelect: number[]=[];
  tallaPorStockZapatilla: Array<{talla: string, stock: number}>= [];
  listaTallas: string[]= ['36', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42'];
  formCreateProduct!: FormGroup;
  file : File = undefined;
  imgSelect: any | ArrayBuffer= ''; // img por defecto.


  constructor(private _formBuilder: FormBuilder, private productSvc: ProductService, private router: Router, private notificationSvc: NotificationService, private marcaSvc: MarcaService, private prueba: FormTallaStockService) {
   
    
  }








  

  




  



  
  



  //-----------------------------------------------------------
  ngOnInit(): void {
    this.getMarcas(); // recupera las marcas
    // validacion del formulario
    this.form1= this._formBuilder.group({
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      precioVenta: ['', [Validators.required]],
      precioCompra: ['', [Validators.required]],
      publicado: ['', []],
      portada: ['', [Validators.required]],
      tallaStockArray: new FormArray([])
    });


    this.form1.patchValue({publicado: false})
    

    
  }
  
  get tallaStockArray(){
    return (<FormArray>this.form1.get('tallaStockArray'));
  }

  addProducto() {
    this.tallaStockArray.push(this.prueba.getTallaStockForm());
  }

  removeUser(i: number) {
    this.tallaStockArray.removeAt(i);
  }

  onSubmit() {
    console.log(this.form1.value);
  }
//--------------------------------------------------------


  // valida el formulario
  public initForm= this._formBuilder.group({
    tallas: this._formBuilder.array([this.crearTallaStock()])
  });

  crearTallaStock(): FormGroup{
    return this._formBuilder.group({
      talla: ['', [Validators.required]],
      stock: ['', [Validators.required]]
    });
  }

  get TallasStock(): FormArray{
    return this.formCreateProduct.get('tallas') as FormArray;
  } 


  getMarcas(){
    this.marcaSvc.allMarcas().subscribe(marcas =>{
      marcas.forEach(marca =>{
        this.listaMarcas.push(marca.nombre);
      })
    })
  }


  

  // crea un producto
  createProduct(){
    //const data= this.form1.value
    //console.log(data.tallaStockArray[0].talla)
    this.productSvc.createProduct(this.form1.value, this.file).subscribe({
      next: data =>{
        this.notificationSvc.openSnackBar(data.message, 'cerrar');
        this.router.navigate(['/products']);
      },
      error: error =>{
        this.notificationSvc.openSnackBar(error.error.message,'cerrar');
      }
    });
  }


 

  // carga la imagen en el formulario cuando se añade una img.
  fileChangeEvent(event: any):void{
    var file; // guarda la img selecciona por el usuario.
    if(event.target.files && event.target.files[0]){ // comprueba si es una img.
      file = <File>event.target.files[0];
    }else{
      this.notificationSvc.openSnackBar('Error al subir la imagen.', 'cerrar');
    }
    // valida que la imagen pese menos de 4MB.
    if(file.size <= 4000000){ // valida el tipo de img.
      if(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/webp'){
        // carga la img.
        const reader= new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        reader.readAsDataURL(file);

        // pone el nombre de la imagen en el input (inputPortada)
        //this.formCreateProduct.patchValue({inputPortada: file.name});

        // guardo la img seleccionada por el usuario en la variable.
        this.file= file;

      }else{
        this.formCreateProduct.patchValue({inputPortada: 'Seleccionar imagen'}); // si la img no es valida reseteo el nombre del input.
        this.notificationSvc.openSnackBar('Formato no compatible. Recuerda (png, webp, jpg o jpge).', 'cerrar');
      }
    }else{
      this.notificationSvc.openSnackBar('La imagen no debe pasar de 4MB.', 'cerrar');
    }
    console.log(this.file);
  }
}
