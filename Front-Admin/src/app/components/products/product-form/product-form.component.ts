import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() inputFormGroup= this._formBuilder.group({});

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
