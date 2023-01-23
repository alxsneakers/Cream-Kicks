import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TallaModel } from 'src/app/models/talla.interface';
import { createTalla } from 'src/app/state/actions/talla.actions';

@Component({
  selector: 'app-create-talla',
  templateUrl: './create-talla.component.html',
  styleUrls: ['./create-talla.component.scss']
})
export class CreateTallaComponent implements OnInit {

  // variables
  formCreateTalla!:FormGroup;

  constructor(private fb: FormBuilder, private store: Store<any>, public dialogRef: MatDialogRef<CreateTallaComponent>) { }

  ngOnInit(): void {
    this.formCreateTalla= this.initForm();
  }

  // valida el formulario
  initForm(): FormGroup{
    return this.fb.group({
      talla: ['', [Validators.required]]
    })
  };

  createTalla(){
    const data: TallaModel= this.formCreateTalla.value;
    this.store.dispatch(createTalla({data}));

  }

  // cierra el dialog (modal)
  onClickCancelar(): void{
    this.dialogRef.close();
  }

  doAction(){
    this.dialogRef.close(this.createTalla());
  }



}
