import { Component, OnInit, Inject, Input, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';
import { NotificationService } from 'src/app/services/notification.service';
import { v4 as uuidv4 } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 


@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.scss']
})
export class CreateCuponComponent implements OnInit {

  // variables
  formCreateCupon!: FormGroup;
  value = 'Clear me';
  dataFomr1: any; 



  constructor(
    public dialogRef: MatDialogRef<CreateCuponComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    private fb: FormBuilder, private cuponSvc: CuponService, private router: Router, private notificationSvc: NotificationService) { }


 

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

  onlyNumbers(event): boolean{
    const charCode= (event.which)?event.which: event.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
    }
    return true;
  }


  // cierra el dialog (modal)
  onClickCancelar(): void{
    this.dialogRef.close();
  }

  doAction(){
    this.dialogRef.close({data:this.formCreateCupon.value});
  }



}


// informacion del dialog
export interface DialogData{
  titulo: string,
}
