import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  // Variables
  formUpdateProduct!: FormGroup;
  file : File = undefined;
  imgSelect: any | ArrayBuffer=''; // img por defecto  
  public id;
  public product;

  constructor(private fb: FormBuilder, private productSvc: ProductService, private router: ActivatedRoute) { }


  // inicia la validacion
  ngOnInit(): void {
    this.formUpdateProduct= this.initForm();
    // obtengo el id del parametro url
    this.router.params.subscribe(params =>{
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
      talla: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      precioCompra: ['', [Validators.required]],
      precioVenta: ['', [Validators.required]],
      portada: ['', []],
      tienda: ['', []]
    });
  }


  // vuelve a colocar la informacion del producto en el formulario.
  colocarInfo(data){
    this.formUpdateProduct.get('nombre').setValue(data.nombre);
    this.formUpdateProduct.get('marca').setValue(data.marca);
    this.formUpdateProduct.get('sku').setValue(data.sku);
    this.formUpdateProduct.get('talla').setValue(data.talla);
    this.formUpdateProduct.get('stock').setValue(data.stock);
    this.formUpdateProduct.get('precioCompra').setValue(data.precioCompra);
    this.formUpdateProduct.get('precioVenta').setValue(data.precioVenta);
    this.formUpdateProduct.get('tienda').setValue(data.tienda);

    // colaca la img del producto en el formulario.
    this.imgSelect= 'http://localhost:4201/api/products/obtenerPortada/' + data.portada;
  }

  // actualiza el producto
  updateProduct(){
    this.productSvc.actualizarProducto(this.formUpdateProduct.value, this.file,this.id).subscribe({
      next: data =>{
        console.log(data);
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
