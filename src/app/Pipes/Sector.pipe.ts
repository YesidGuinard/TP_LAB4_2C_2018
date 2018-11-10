import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Sector'
})
export class SectorPipe implements PipeTransform {

  transform(sector: String): String {
    let retorno: String = '';
    switch (sector) {
      case 'Cocinero':
        retorno = 'Cocina';
        break;
      case 'Bartender':
        retorno = 'Barra de Tragos y Vinos';
        break;
      case 'Cervecero':
        retorno = 'Barra de Choperas';
        break;
    }
    return retorno;
  }

}
