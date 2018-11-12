import { JwtHelperService } from '@auth0/angular-jwt';
import { Directive, ElementRef, Renderer, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appValidarRoles]'
})
export class ValidarRolesDirective implements OnInit {

  private rolesAdmitidos: string[];

  @Input() set appValidarRoles(value: string[]) {
    this.rolesAdmitidos = value;
  }

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private jwt: JwtHelperService
  ) {
  }

  ngOnInit() {
    if (this.CheckRoles()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private CheckRoles(): Boolean {
    let retorno: Boolean = false;
    const token = localStorage.getItem('token');
    const tokenInfo = this.jwt.decodeToken(token);

    if (this.rolesAdmitidos && tokenInfo) {
      const tipoUsuario = tokenInfo['tipo'];
      this.rolesAdmitidos.forEach(element => {
        if (tipoUsuario === element) {
          retorno = true;
        }
      });
    }

    return retorno;
  }
}
