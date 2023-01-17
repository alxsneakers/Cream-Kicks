import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { CustomValidators } from '../custom-validators';

// informacion del dialog
export interface DialogData{
  titulo: string,
  nombre: string,
  validacion: string,
  genero: string,
  cuerpo: string
}


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  // variables
  form!: FormGroup;
  control: AbstractControl;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder) { }


  // inicia la validacion del input
  ngOnInit(): void {
    this.form= this.initForm();
    this.form.patchValue({valueInput: this.data.validacion});
  }

  // valida el input
  initForm(): FormGroup{
    return this.fb.group({
      productName: ['', Validators.required],
      valueInput: ['', []]
    },
    { validators: CustomValidators.productMaching });
  }

  get productName(): FormControl{
    return this.form.get('productName') as FormControl;
  }


  // cierra el dialog (modal)
  onClickNO(): void{
    this.dialogRef.close();
  }

}
