import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pedido } from './../../../Model/Pedido';
import { PedidoService } from './../../../Services/pedido.service';

@Component({
  selector: 'app-pedidos-mesa',
  templateUrl: './pedidos-mesa.component.html',
  styleUrls: ['./pedidos-mesa.component.scss']
})
export class PedidosMesaComponent implements OnInit {
  @Input() listaPedidos: Pedido[];
  @Input() title: string;
  @Output() refrescarEvent: EventEmitter<void>;
  constructor() {
    this.refrescarEvent = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  calcularTotal(): Number {
    let total: Number = 0;
    if (this.listaPedidos) {
      total = +this.listaPedidos.map( pedido => {
        return pedido.importe;
      }).reduce( (importeAnterior, importeActual) => {
        return importeAnterior + importeActual;
      });
    }

    return total;
  }

  refrescar() {
    this.refrescarEvent.emit();
  }
}
