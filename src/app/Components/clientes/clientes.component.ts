import { Pedido } from './../../Model/Pedido';
import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PedidoService } from 'src/app/Services/pedido.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  listaPedidos: Pedido[];
  codigoMesa: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidosService: PedidoService
  ) {
    this.route.paramMap.subscribe( x => {
      this.codigoMesa = x.get('codMesa');
      this.cargarLista();
    });
  }

  ngOnInit() { }

  public cargarLista() {
    this.pedidosService.ListarPorMesa(this.codigoMesa).subscribe( response => {
      console.log(response);
      this.listaPedidos = response;
    },
    error => {
      console.error(error);
    });
  }
}
