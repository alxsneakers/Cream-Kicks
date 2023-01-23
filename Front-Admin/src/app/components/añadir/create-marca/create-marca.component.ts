import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MarcaModel } from 'src/app/models/marca.interface';
import * as marcaActions from '../../../state/actions/marca.actions';

@Component({
  selector: 'app-create-marca',
  templateUrl: './create-marca.component.html',
  styleUrls: ['./create-marca.component.scss']
})
export class CreateMarcaComponent implements OnInit {

  // variables
  formCreateMarca!:FormGroup;



  constructor(private fb: FormBuilder, private store: Store<any>, public dialogRef: MatDialogRef<CreateMarcaComponent>) { }

  ngOnInit(): void {
    this.formCreateMarca= this.initForm();
  }

  // valida el formulario
  initForm(): FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.required]]
    })
  };

    createMarca(){
      const data: MarcaModel= this.formCreateMarca.value;
      this.store.dispatch(marcaActions.createMarca({data}));
    };


    // cierra el dialog (modal)
    onClickCancelar(): void{
      this.dialogRef.close();
    }
  
    doAction(){
      this.dialogRef.close(this.createMarca());
    }

  



}
