import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMensajes'
})
export class FilterMensajesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultMensajes= [];
    for(const mensaje of value){
      if(mensaje.email.indexOf(arg) > -1){
        resultMensajes.push(mensaje);
      }; 
    };
    return resultMensajes;
  }

}
