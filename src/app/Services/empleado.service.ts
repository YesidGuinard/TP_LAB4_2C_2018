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

  public Modificar(usuario: string, id: number, nombre: string, tipo: string): Promise<object> {
    const request: Object = {
      id: id,
      usuario: usuario,
      nombre: nombre,
      tipo: tipo
    };
    return this.miHttp.httpPostP('empleados/modificar/', request);
  }

  public Baja(id: number): Promise<object> {
    return this.miHttp.httpDeleteP('empleados/' + id);
  }

  public Suspender(id: number): Promise<object> {
    return this.miHttp.httpGetP('empleados/suspender/' + id);
  }

  public CambiarClave(newPassword: string): Promise<object> {
    const request: Object = {
      clave: newPassword
    };
    return this.miHttp.httpPostP('empleados/cambiarClave/', request);
  }

  public CantidadOperacionesPorSector(): Observable<OperacionesPorSector[]> {
    return this.miHttp.httpGetO<OperacionesPorSector[]>('empleados/cantidadOperacionesPorSector');
  }
}
