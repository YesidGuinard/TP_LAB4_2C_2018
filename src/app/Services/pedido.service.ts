import { Injectable } from '@angular/core';
import { HttpBase } from './http-base.service';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';
import { Pedido } from '../Model/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor(public miHttp: HttpBase<Pedido>) {
  }

  public ListarPorMesa(codigoMesa : string): Observable<Pedido[]> {
    return this.miHttp.httpGetO('pedido/listarPorMesa/'+codigoMesa);
  }
}
