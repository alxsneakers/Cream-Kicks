import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';
import { NotificationService } from 'src/app/services/notification.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.scss']
})
export class CreateCuponComponent implements OnInit {

  // variables
  formCreateCupon!: FormGroup;
  value = 'Clear me';



  constructor(private fb: FormBuilder, private cuponSvc: CuponService, private router: Router, private notificationSvc: NotificationService) { }


  // inicia la validacion
  ngOnInit(): void {
    this.formCreateCupon= this.initForm();
  }

  // valida el formulario
  initForm(): FormGroup{
    return this.fb.group({
      codigo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      limite: ['', [Validators.required]]
    });
  }

  createCupon(){
    this.cuponSvc.createCupon(this.formCreateCupon.value).subscribe({
      next: data =>{
        this.notificationSvc.openSnackBar(data.message, 'cerrar');
        this.router.navigate(['/cupones']);
      },
      error: error =>{
        this.notificationSvc.openSnackBar(error.error.message, 'cerrar');        
      }
    });
  }

  // genera un codigo aleatorio de clave unica.
  generarCodigo(){
    this.formCreateCupon.patchValue({codigo: uuidv4()});
  }


  

}
