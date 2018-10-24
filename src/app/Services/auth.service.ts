import { Injectable } from '@angular/core';
import { HttpBase } from './http-base.service';
import { Login } from '../Model/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public miHttp: HttpBase<any>) {
  }

  Loguear(dataLogin : Login){
    let request : JSON = JSON.parse(JSON.stringify(dataLogin));
    return this.miHttp.httpPostP("/empleados/login", request);
  }

  logout(){
    localStorage.removeItem("currentUser");
  }
}
