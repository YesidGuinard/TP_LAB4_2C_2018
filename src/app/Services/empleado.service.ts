import { OperacionesPorSector } from './../Model/OperacionesPorSector';
import { Injectable } from '@angular/core';
import { HttpBase } from './http-base.service';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';
import { Empleado } from '../Model/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  constructor(public miHttp: HttpBase) {
  }

  public Listar(): Observable<Empleado[]> {
    return this.miHttp.httpGetO<Empleado[]>('empleados/listar/');
  }

  public Registrar(usuario: string, password: string, nombre: string, tipo: string): Promise<object> {
    const request: Object = {
      usuario: usuario,
      clave: password,
      nombre: nombre,
      tipo: tipo
    };
    return this.miHttp.httpPostP('empleados/registrarEmpleado/', request);
  }

  public CantidadOperacionesPorSector(): Observable<OperacionesPorSector[]> {
    return this.miHttp.httpGetO<OperacionesPorSector[]>('empleados/cantidadOperacionesPorSector');
  }
}
