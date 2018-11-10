import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Estado'
})
export class EstadoPipe implements PipeTransform {

  transform(estado: String): String {
    let retorno: String = '';
    switch (estado) {
      case 'A':
        retorno = 'Activo';
        break;
      case 'S':
        retorno = 'Suspendido';
        break;
      case 'B':
        retorno = 'Eliminado';
        break;
    }
    return retorno;
  }

}
