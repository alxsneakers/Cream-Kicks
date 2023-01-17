import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MarcaModel } from 'src/app/models/marca.interface';
import { MarcaService } from 'src/app/services/marca.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as marcaActions from '../../../state/actions/marca.actions';
import * as marcaSelectors from '../../../state/selectors/marca.selectors';

@Component({
  selector: 'app-create-marca',
  templateUrl: './create-marca.component.html',
  styleUrls: ['./create-marca.component.scss']
})
export class CreateMarcaComponent implements OnInit {

  // variables
  formCreateMarca!:FormGroup;
  isLoading$: Observable<boolean>;
  isError$: Observable<string | null>;


  constructor(private fb: FormBuilder, private store: Store<any>, private router: Router, private notificationSvc: NotificationService) { }

  ngOnInit(): void {
    this.isError$= this.store.select(marcaSelectors.selectIsErrorCreateMarca);
    this.isLoading$= this.store.select(marcaSelectors.selectIsLoadingCreateMarca);
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



}
