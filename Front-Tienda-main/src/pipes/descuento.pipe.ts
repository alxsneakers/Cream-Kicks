import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento'
})
export class DescuentoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(args[1].toLocaleLowerCase().includes(args[2])){
      let descuento= value - (value*args[0])/100;
      return descuento;
    } 
  }

}
