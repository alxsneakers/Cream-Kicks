import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DescuentoService } from 'src/app/services/descuento.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-descuento',
  templateUrl: './create-descuento.component.html',
  styleUrls: ['./create-descuento.component.scss']
})
export class CreateDescuentoComponent implements OnInit {

  // variables
  formCreateDescuento!: FormGroup;
  file : File = undefined;
  imgSelect: any | ArrayBuffer= ''; // img por defecto.

 

  constructor(private fb: FormBuilder, private descuentoSvc: DescuentoService, private router: Router, private notificationSvc: NotificationService) { }

  ngOnInit(): void {
    this.formCreateDescuento= this.initForm();
  }


  // valida el formulario
  initForm(): FormGroup{
    return this.fb.group({
      titulo: ['', Validators.required],
      banner: ['', [Validators.required]],
      descuento: ['', Validators.required],
      fecha_inicio: ['',Validators.required],
      fecha_fin: ['', Validators.required]
    });
  }

  registro_descuento(){
    console.log(this.formCreateDescuento.value);
    
    this.descuentoSvc.registro_descuento(this.formCreateDescuento.value, this.file).subscribe({
      next: data =>{
        this.router.navigate(['/descuentos']);
      },
      error: error =>{
        this.notificationSvc.openSnackBar(error.error.message, 'cerrar')
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
        this.formCreateDescuento.patchValue({inputPortada: 'Seleccionar imagen'}); // si la img no es valida reseteo el nombre del input.
        this.notificationSvc.openSnackBar('Formato no compatible. Recuerda (png, webp, jpg o jpge).', 'cerrar');
      }
    }else{
      this.notificationSvc.openSnackBar('La imagen no debe pasar de 4MB.', 'cerrar');
    }
    console.log(this.file);
  }



}
