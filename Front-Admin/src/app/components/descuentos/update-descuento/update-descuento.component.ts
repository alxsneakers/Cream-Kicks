import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DescuentoService } from 'src/app/services/descuento.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-update-descuento',
  templateUrl: './update-descuento.component.html',
  styleUrls: ['./update-descuento.component.scss']
})
export class UpdateDescuentoComponent implements OnInit {

  // variables
  formUpdateDescuento!: FormGroup;
  file : File = undefined;
  imgSelect: any | ArrayBuffer=''; // img por defecto  
  public id;
  public descuento;

  constructor(private fb: FormBuilder, private descuentoSvc: DescuentoService, private aRouter: ActivatedRoute, private router: Router , private notificationSvc: NotificationService) { }

  ngOnInit(): void {
    this.formUpdateDescuento= this.initForm();
    this.obtenerIdPath();
    this.getDescuento();
  }

  // valida el formulario
  initForm(): FormGroup{
    return this.fb.group({
      titulo: ['', Validators.required],
      banner: ['', []],
      descuento: ['', Validators.required],
      fecha_inicio: ['',Validators.required],
      fecha_fin: ['', Validators.required]
    });
  }

  obtenerIdPath(){
    this.aRouter.params.subscribe(params =>{
      this.id= params['id'];
    });
  }

  getDescuento(){
    this.descuentoSvc.obtener_descuento(this.id).subscribe(
      response =>{
        this.descuento= response;
        this.colocarInfo(response);
      }
    )
  }

  update_descuento(){
    this.descuentoSvc.actualizar_descuento(this.formUpdateDescuento.value, this.file, this.id).subscribe(
      response =>{
        this.notificationSvc.openSnackBar(response.message, 'x');
        this.router.navigate(['/descuentos']);
      },
      error =>{
        this.notificationSvc.openSnackBar(error.error.error, 'x');
      }
    )
  }

  colocarInfo(data){
    this.formUpdateDescuento.get('titulo').setValue(data.titulo);
    this.formUpdateDescuento.get('descuento').setValue(data.descuento);
    this.formUpdateDescuento.get('fecha_inicio').setValue(new Date(data.fecha_inicio));
    this.formUpdateDescuento.get('fecha_fin').setValue(new Date(data.fecha_fin));
    // coloca la img
    this.imgSelect= 'http://localhost:4201/api/descuentos/obtenerBanner/' + data.banner;

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
        this.formUpdateDescuento.patchValue({inputPortada: 'Seleccionar imagen'}); // si la img no es valida reseteo el nombre del input.
        console.log('Formato no compatible. Recuerda (png, webp, jpg o jpeg).');
      }
    }else{
      console.log('La imagen no debe pasar de 4MB.')
    }
    console.log(this.file);
  };

}
