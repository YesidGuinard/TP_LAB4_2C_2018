import { Directive, ElementRef, Renderer, OnInit, Input } from '@angular/core';
import { Pedido } from '../Model/Pedido';

@Directive({
  selector: '[appEstadoPedido]'
})
export class EstadoPedidoDirective implements OnInit {
  @Input() pedido: Pedido;

  constructor(public el: ElementRef,
    public rederer: Renderer) {
  }

  ngOnInit() {
    switch (this.pedido.estado) {
      case 'En Preparacion':
        this.el.nativeElement.innerHTML = '<i class="far fa-clock"></i>';
        break;
      case 'Pendiente':
        this.el.nativeElement.innerHTML = '<i class="fas fa-list-ol"></i>';
        break;
      case 'Listo para Servir':
        this.el.nativeElement.innerHTML = '<i class="fas fa-check"></i>';
        break;
      case 'Entregado':
        this.el.nativeElement.innerHTML = '<i class="fas fa-check-double"></i>';
        break;
      case 'Cancelado':
        this.el.nativeElement.innerHTML = '<i class="far fa-times-circle"></i>';
        break;
      case 'Finalizado':
        this.el.nativeElement.innerHTML = '<i class="fas fa-hourglass-end"></i>';
        break;
    }
  }
}
