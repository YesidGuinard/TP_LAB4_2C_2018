import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarPorRol'
})
export class FiltrarPorRolPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
