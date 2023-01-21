import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  MinValidator,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { timeStamp } from 'console';
import { NotificationService } from 'src/app/services/notification.service';
import { MarcaService } from 'src/app/services/marca.service';
import { FormTallaStockService } from 'src/app/services/form-talla-stock.service';

export interface Talla {
  value: string;
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  form1 = new FormGroup({});

  // variables
  checked: boolean = false;
  displayedColumns: string[] = ['talla', 'stock'];
  separatorKeysCodes = [ENTER, COMMA] as const;
  listaMarcas: Array<any> = [];
  tallasSelect: string[] = [];
  stockSelect: number[] = [];
  tallaPorStockZapatilla: Array<{ talla: string; stock: number }> = [];
  listaTallas: string[] = [
    '36',
    '37',
    '37.5',
    '38',
    '38.5',
    '39',
    '39.5',
    '40',
    '40.5',
    '41',
    '41.5',
    '42',
  ];
  formCreateProduct!: FormGroup;
  imgSelect: any | ArrayBuffer = ''; // img por defecto.
  images: File[]=[];


  constructor(
    private _formBuilder: FormBuilder,
    private productSvc: ProductService,
    private router: Router,
    private notificationSvc: NotificationService,
    private marcaSvc: MarcaService,
    private prueba: FormTallaStockService
  ) {}

  //-----------------------------------------------------------
  ngOnInit(): void {
    this.getMarcas(); // recupera las marcas
    // validacion del formulario
    this.form1 = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      precioVenta: ['', [Validators.required]],
      precioCompra: ['', [Validators.required]],
      publicado: ['', []],
      tallaStockArray: new FormArray([]),
    });

    this.form1.patchValue({ publicado: false });
  }

  get tallaStockArray() {
    return <FormArray>this.form1.get('tallaStockArray');
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
  public initForm = this._formBuilder.group({
    tallas: this._formBuilder.array([this.crearTallaStock()]),
  });

  crearTallaStock(): FormGroup {
    return this._formBuilder.group({
      talla: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }

  get TallasStock(): FormArray {
    return this.formCreateProduct.get('tallas') as FormArray;
  }

  getMarcas() {
    this.marcaSvc.allMarcas().subscribe((marcas) => {
      marcas.forEach((marca) => {
        this.listaMarcas.push(marca.nombre);
      });
    });
  }

  // crea un producto
  createProduct() {
    this.productSvc.createProduct(this.form1.value, this.images[0], this.images).subscribe({
      next: (data) => {
        this.notificationSvc.openSnackBar(data.message, 'cerrar');
        this.router.navigate(['/productos']);
      },
      error: (error) => {
        this.notificationSvc.openSnackBar(error.error.message, 'cerrar');
      }
    });
  }

 
  onlyNumbers(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSelect(event){
    // antes de añadir el archivo compruebo si es una imagen.    
    if(event.addedFiles[0].size <= 4000000){
      if(event.addedFiles[0].type == 'image/png' || event.addedFiles[0].type == 'image/jpg' || event.addedFiles[0].type == 'image/jpeg' || event.addedFiles[0].type == 'image/webp'){
          // inserta la imagen en el array.
          this.images.push(...event.addedFiles);
          const formData= new FormData();
          for(var i=0; i < this.images.length; i++){
            formData.append('',this.images[i]);            
          }
      }else{
        this.notificationSvc.openSnackBar('El formato '+ event.addedFiles.type +' no es compatible.', 'cerrar');
      }
    }else{
      this.notificationSvc.openSnackBar('La imagen debe pesar menos de 4MB', 'cerrar');
    } 
  }


  onRemove(event) {
    this.images.splice(this.images.indexOf(event), 1);
  }

  
  

 
}


