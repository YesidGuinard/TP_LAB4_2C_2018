import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'Ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(value: Array<any>, indicePropiedad, reverse: Boolean): Array<any> {
    if (reverse) {
      return _.sortBy(value, elemento => {
        return elemento[indicePropiedad].toUpperCase();
      }).reverse();
    } else {
      return _.sortBy(value, elemento => {
        return elemento[indicePropiedad].toUpperCase();
      });
    }
  }
}
