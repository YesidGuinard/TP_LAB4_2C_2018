import { JwtHelperService } from '@auth0/angular-jwt';
import { Pedido } from './../Model/Pedido';
import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appAccionPedido]'
})
export class AccionPedidoDirective implements OnInit {
  @Input() pedido: Pedido;

  constructor(public el: ElementRef,
    public rederer: Renderer,
    private jwt: JwtHelperService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenInfo = this.jwt.decodeToken(token);

    if (tokenInfo) {
      const tipoUsuario = tokenInfo['tipo'];
      let innerHTML: String = '';

      if (tipoUsuario !== 'Mozo') {
        switch (this.pedido.estado) {
          case 'En Preparacion':
            // tslint:disable-next-line:max-line-length
            innerHTML += '<a style="cursor: pointer;" (click)="marcarParaServir()" data-toggle="tooltip" title="Marcar como Listo para Servir"><i class="far fa-check-circle"></i>  </a>';
            break;
          case 'Pendiente':
            // tslint:disable-next-line:max-line-length
            innerHTML += '<a style="cursor: pointer;" (click)="tomarPedido()" data-toggle="tooltip" title="Tomar Pedido"><i class="fas fa-clipboard-list"></i>  </a>';
            break;
        }
      }
      if (tipoUsuario === 'Mozo' || tipoUsuario === 'Socio') {
        switch (this.pedido.estado) {
          case 'Listo para Servir':
            // tslint:disable-next-line:max-line-length
            innerHTML += '<a style="cursor: pointer;" (click)="servirPedido()" data-toggle="tooltip" title="Servir Pedido"><i class="fas fa-concierge-bell"></i>  </a>';
          // tslint:disable-next-line:no-switch-case-fall-through
          case 'En Preparacion':
          case 'Pendiente':
            // tslint:disable-next-line:max-line-length
            innerHTML += '<a style="cursor: pointer;" (click)="cancelarPedido()" data-toggle="tooltip" title="Cancelar Pedido"><i class="fas fa-ban"></i>  </a>';
            break;
        }
      }

      this.el.nativeElement.innerHTML = innerHTML;
    }



  }
}
