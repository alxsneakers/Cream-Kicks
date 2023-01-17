import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from '../../shared/custom-validators';

export interface DialogborrarCuentaData{
  nombreCuenta: string;
  validacion: string;
}


@Component({
  selector: 'app-confirm-borrar-cuenta',
  templateUrl: './confirm-borrar-cuenta.component.html',
  styleUrls: ['./confirm-borrar-cuenta.component.scss']
})
export class ConfirmBorrarCuentaComponent implements OnInit {

  
  


  form!: FormGroup;
  control: AbstractControl;

  constructor(public dialogRef: MatDialogRef<ConfirmBorrarCuentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogborrarCuentaData, private fb: FormBuilder) { }




  // inicia la validacion
  ngOnInit(): void {
    this.form= this.initForm();
    this.form.patchValue({valueInput: this.data.validacion});
  }


  initForm(): FormGroup{
    return this.fb.group({
        nombreCuenta: ['', Validators.required],
        valueInput: ['', []],
        confirmInput: ['', Validators.required]
      },
      {
        validators: CustomValidators.deleteAccountMaching });
  }

  get nombreCuenta(): FormControl{
    return this.form.get('nombreCuenta') as FormControl;
  }

  // cierra el modal
  onClickNo(): void{
    this.dialogRef.close();
  }

}
