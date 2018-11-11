import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Login } from 'src/app/Model/Login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados-login',
  templateUrl: './empleados-login.component.html',
  styleUrls: ['./empleados-login.component.scss']
})
export class EmpleadosLoginComponent implements OnInit {

  public form: FormGroup;
  public error: boolean;
  public errorMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
              localStorage.setItem('token', response['Token']);
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
