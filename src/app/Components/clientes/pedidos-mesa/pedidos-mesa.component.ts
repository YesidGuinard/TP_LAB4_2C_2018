import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from './../../../Model/Pedido';
import { PedidoService } from './../../../Services/pedido.service';

@Component({
  selector: 'app-pedidos-mesa',
  templateUrl: './pedidos-mesa.component.html',
  styleUrls: ['./pedidos-mesa.component.scss']
})
export class PedidosMesaComponent implements OnInit {
  @Input() codMesa: string;
  public listaPedidos: Pedido[];
  constructor(private pedidoService: PedidoService) {
    this.cargarLista();
  }

  ngOnInit() {
  }

  
}
