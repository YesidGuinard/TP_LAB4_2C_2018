import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Login } from 'src/app/Model/Login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/Model/User';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-empleados-login',
  templateUrl: './empleados-login.component.html',
  styleUrls: ['./empleados-login.component.scss']
})
export class EmpleadosLoginComponent implements OnInit {

  public form: FormGroup;
  public error: boolean;
  public errorMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private jwt: JwtHelperService, private router: Router) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  CargarDefault(tipo: string) {
    let dataLogin: Login = null;
    switch (tipo) {
      case 'S':
        dataLogin = new Login('admin', 'admin');
        this.form.setValue(dataLogin);
        this.Submit();
        break;
      case 'B':
        dataLogin = new Login('Matias', '1234');
        this.form.setValue(dataLogin);
        this.Submit();
        break;
      case 'CE':
        dataLogin = new Login('cervecero', 'cervecero');
        this.form.setValue(dataLogin);
        this.Submit();
        break;
      case 'CO':
        dataLogin = new Login('cocinero', 'cocinero');
        this.form.setValue(dataLogin);
        this.Submit();
        break;
      case 'M':
        dataLogin = new Login('mozo', 'mozo');
        this.form.setValue(dataLogin);
        this.Submit();
        break;
    }
  }

  public Submit(): void {
    this.errorMessage = '';
    this.error = false;
    if (this.form.valid) {
      const dataLogin: Login = new Login(this.form.get('user').value,
        this.form.get('pass').value);
      this.authService.Loguear(dataLogin)
        .then(
          response => {
            if (response['Estado'] === 'OK') {
              const token: JSON = this.jwt.decodeToken(response['Token']);
              const user: User = new User(token['usuario'], token['tipo'], token['id'], token['nombre'], response['Token']);
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('token', JSON.stringify(token));
              if (!this.authService.redirectUrl) {
                this.authService.redirectUrl = '/Empleados';
              }
              this.router.navigate([this.authService.redirectUrl]);
            } else {
              this.error = true;
              this.errorMessage = response['Mensaje'];
            }
          }
        )
        .catch(
          response => {
            this.error = true;
            this.errorMessage = response['Mensaje'];
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }

}
