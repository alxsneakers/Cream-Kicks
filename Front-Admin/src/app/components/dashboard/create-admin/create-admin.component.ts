import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateAdminModel } from 'src/app/models/auth.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { createAdminAction } from 'src/app/state/actions/auth.actions';
import { DialogData } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {


  // variables
  formCreateAdmin!:FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store<any>, public dialogRef: MatDialogRef<CreateAdminComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData, private notificationSvc: NotificationService) { }

  ngOnInit(): void {
    this.formCreateAdmin= this.initForm();
  }

  // valida el formulario
  initForm(): FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  };

  createAdmin(){
    const data: CreateAdminModel= this.formCreateAdmin.value;
    this.store.dispatch(createAdminAction({data}));
  };

  // cierra el dialog (modal)
  onClickCancelar(): void{
    this.dialogRef.close();
  }

  doAction(){
    this.dialogRef.close(this.createAdmin());
  }


  onlyText(event): boolean{
    const charCode= (event.which)?event.which: event.keyCode;
    if(((charCode >= 65 && charCode <= 90) || (event.keyCode > 96 && event.keyCode < 123) || charCode == 8)){
      return true;
    }
    return false;
  }



}
