import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {

  // Metodo que valida si .
  static productMaching(control: AbstractControl): ValidationErrors | null{
    const productName= control.get('productName')?.value;
    const message= control.get('valueInput')?.value;
    if(productName === message && (productName !== null)){
      return null;
    }else{
      return {productNotMaching: true};
    }
  }

  // metodo que valida si la el usuario a introduce el "nombre de la cuenta" y la palabra "confirmar".
  static deleteAccountMaching(control: AbstractControl): ValidationErrors | null {
    const nombreCuentaInput= control.get('nombreCuenta')?.value;
    const nombreCuenta= control.get('valueInput')?.value;
    const palabra= control.get('confirmInput')?.value;
    if((nombreCuentaInput === nombreCuenta) && (palabra === 'confirmar')){
      return null;
    }else{
      return {deleteAccountMaching: true}
    }
  }


 
}