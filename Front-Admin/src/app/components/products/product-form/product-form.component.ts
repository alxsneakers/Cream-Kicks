import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TallaService } from 'src/app/services/talla.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  @Input() inputFormGroup= this._formBuilder.group({});
  listaTallas: Array<any> = [];


  constructor(private _formBuilder: FormBuilder, private _tallaService: TallaService) {
    this.getTallas();
   }



  onlyNumbers(event): boolean{
    const charCode= (event.which)?event.which: event.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
    }
    return true;
  }

  getTallas() {
    this._tallaService.allTallas().subscribe((tallas) => {
      tallas.forEach((talla) => {
        this.listaTallas.push(talla.talla);
      });
    });
  }

}
