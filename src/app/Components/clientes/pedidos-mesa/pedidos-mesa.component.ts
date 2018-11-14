import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Input() showTotal: boolean;
  @Output() refrescarEvent: EventEmitter<void>;
  form: FormGroup;
  error: boolean;
  errorMessage: string;
  showModal: boolean;
  private codigoAux: string;

  constructor(private pedidoService: PedidoService, private fb: FormBuilder) {
    this.refrescarEvent = new EventEmitter<void>();
    this.form = this.fb.group({
      tiempoEstimado: [0, Validators.required]
    });
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

  marcarParaServir(codigo: string) {
    this.pedidoService.MarcarListoParaServir(codigo).then( () => {
      this.refrescar();
    });
  }

  tomarPedido() {
    this.errorMessage = '';
    this.error = false;
    if (this.form.valid) {
      const tiempoEstimado = this.form.get('tiempoEstimado').value;

      this.pedidoService.TomarPedido(this.codigoAux, tiempoEstimado)
        .then(
          response => {
            console.log(response);
            this.refrescar();
            this.showModal = false;
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }

  servirPedido(codigo: string) {
    this.pedidoService.Servir(codigo).then( () => {
      this.refrescar();
    });
  }

  cancelarPedido(codigo: string) {
    this.pedidoService.Cancelar(codigo).then( () => {
      this.refrescar();
    });
  }

  ClickTomarPedido(codigo: string) {
    this.codigoAux = codigo;
    this.showModal = true;
  }

}
