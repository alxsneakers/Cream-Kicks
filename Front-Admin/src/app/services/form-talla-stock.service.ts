import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { validate } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FormTallaStockService {

  constructor(private _formBuilder: FormBuilder) { }

  getTallaStockForm(){
    return this._formBuilder.group({
      talla: ['', [Validators.required]],
      stock: ['', [Validators.required]]
    });
  }


}
