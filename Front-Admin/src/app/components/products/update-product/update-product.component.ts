import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { FormTallaStockService } from 'src/app/services/form-talla-stock.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  // Variables
  formUpdateProduct!: FormGroup;
  publicado: boolean= false;
  file : File = undefined;
  imgSelect: any | ArrayBuffer=''; // img por defecto  
  public id;
  public product;
  listaMarcas: Array<any>=[];
  tallaPorStockZapatilla: Array<{ talla: string; stock: number }> = [];


  constructor(private fb: FormBuilder, private productSvc: ProductService, private routerA: ActivatedRoute, private router: Router, private formTallaService: FormTallaStockService, private marcaSvc: MarcaService) { }


  // inicia la validacion
  ngOnInit(): void {
    this.getMarcas();
    this.formUpdateProduct= this.initForm();
    // obtengo el id del parametro url
    this.routerA.params.subscribe(params =>{
      this.id= params['id'];
    });
    // rellena los datos del formulario con el producto.
    this.productSvc.obtenerProducto(this.id).subscribe(producto =>{
      this.product= producto; // guardo el producto
      this.colocarInfo(producto); // pongo la informacion en el formulario.  
      
      
           
      
    }, error=>{
      console.log(error);
    })
  };


  // valida el formulario
  initForm(): FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      precioCompra: ['', [Validators.required]],
      precioVenta: ['', [Validators.required]],
      portada: ['', []],
      tienda: ['', []],
      tallaStockArray: new FormArray([])
    });

  }


  getMarcas(){
    this.marcaSvc.allMarcas().subscribe(marcas =>{
      marcas.forEach(marca =>{
        this.listaMarcas.push(marca.nombre);
      })
    })
  }

  


  // vuelve a colocar la informacion del producto en el formulario.
  colocarInfo(data){
    this.formUpdateProduct.get('nombre').setValue(data.nombre);
    this.formUpdateProduct.get('marca').setValue(data.marca);
    this.formUpdateProduct.get('sku').setValue(data.sku);
    this.formUpdateProduct.get('precioCompra').setValue(data.precioCompra);
    this.formUpdateProduct.get('precioVenta').setValue(data.precioVenta);
    this.publicado= data.publicado;
    this.product.tallas.forEach(element => this.tallaStockArray.push(this.fb.group({talla: [element.talla, [Validators.required]], stock: [element.stock, [Validators.required]]})));    
    // colaca la img del producto en el formulario.
    this.imgSelect= 'http://localhost:4201/api/products/obtenerPortada/' + data.portada;
  }

  get tallaStockArray() {
    return <FormArray>this.formUpdateProduct.get('tallaStockArray');
  }

  addProducto() {
    this.tallaStockArray.push(this.formTallaService.getTallaStockForm());
  }

  removeUser(i: number) {
    this.tallaStockArray.removeAt(i);
  }

  // actualiza el producto
  updateProduct(){     
    this.productSvc.actualizarProducto(this.formUpdateProduct.value, this.file,this.id).subscribe({
      next: data =>{
        this.router.navigate(['/productos']);
      },
      error: error =>{
        console.log(error);
      }
    });
  }

  // carga la imagen en el formulario cuando se añade una img.
  fileChangeEvent(event: any):void{
    var file; // guarda la img selecciona por el usuario.
    if(event.target.files && event.target.files[0]){ // comprueba si es una img.
      file = <File>event.target.files[0];
    }else{
      console.log('error al subir la imagen')
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
        this.formUpdateProduct.patchValue({inputPortada: 'Seleccionar imagen'}); // si la img no es valida reseteo el nombre del input.
        console.log('Formato no compatible. Recuerda (png, webp, jpg o jpeg).');
      }
    }else{
      console.log('La imagen no debe pasar de 4MB.')
    }
    console.log(this.file);
  };
}
