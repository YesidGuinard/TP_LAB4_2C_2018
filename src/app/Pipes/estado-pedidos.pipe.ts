import { Pedido } from './../Model/Pedido';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoPedidos'
})
export class EstadoPedidosPipe implements PipeTransform {

  transform(value: any, pedido: Pedido): any {
    if (!value) {
      return 'Aún no calculado';
    } else if (pedido.estado === 'Entregado' || pedido.estado === 'Finalizado') {
      return 'Entregado';
    } else {
      return value;
    }
  }
}
