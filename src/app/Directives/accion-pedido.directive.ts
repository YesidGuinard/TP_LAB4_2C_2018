import { BotonPedido } from './../Components/Common/botonPedido.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pedido } from './../Model/Pedido';
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAccionPedido]'
})
export class AccionPedidoDirective implements OnInit {
  pedido: Pedido;
  @Input() set appAccionPedido(value: Pedido) {
    this.pedido = value;
  }

  boton: BotonPedido;
  @Input() set appAccionPedidoBoton(value: BotonPedido) {
    this.boton = value;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private jwt: JwtHelperService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenInfo = this.jwt.decodeToken(token);
    let renderizar = false;

    if (tokenInfo) {
      const tipoUsuario = tokenInfo['tipo'];

      if (tipoUsuario !== 'Mozo') {
        switch (this.pedido.estado) {
          case 'En Preparacion':
            if (this.boton === BotonPedido.ParaServir) {
              renderizar = true;
            }
            break;
          case 'Pendiente':
            if (this.boton === BotonPedido.Tomar) {
              renderizar = true;
            }
            break;
        }
      }
      if (tipoUsuario === 'Mozo' || tipoUsuario === 'Socio') {
        switch (this.pedido.estado) {
          case 'Listo para Servir':
            if (this.boton === BotonPedido.Servir) {
              renderizar = true;
            }
          // tslint:disable-next-line:no-switch-case-fall-through
          case 'En Preparacion':
          case 'Pendiente':
            if (this.boton === BotonPedido.Cancelar) {
              renderizar = true;
            }
            break;
        }
      }

      if (renderizar) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }

    }



  }
}
