import { Pedido } from './../../Model/Pedido';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/Services/pedido.service';

@Component({
  selector: 'app-pedidos-board',
  templateUrl: './pedidos-board.component.html',
  styleUrls: ['./pedidos-board.component.scss']
})
export class PedidosBoardComponent implements OnInit {

  listaPedidos: Pedido[];

  constructor(private pedidosService: PedidoService) {
    this.cargarLista();
  }

  ngOnInit() {
  }

  public cargarLista() {
    this.pedidosService.ListarActivosPorSector().subscribe( response => {
      console.log(response);
      this.listaPedidos = response;
    },
    error => {
      console.error(error);
    });
  }
}
