import { EmpleadoService } from './../../../Services/empleado.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-empleados-registro',
  templateUrl: './empleados-registro.component.html',
  styleUrls: ['./empleados-registro.component.scss']
})
export class EmpleadosRegistroComponent implements OnInit {
  @Output() registradoCorrectamente: EventEmitter<any>;
  @ViewChild('captchaElem') captcha: ReCaptcha2Component;
  public form: FormGroup;
  public key: string;
  public errorMessage: string;
  public error: boolean;
  public success: boolean;

  constructor(private fb: FormBuilder, private empleadoService: EmpleadoService) {
    this.registradoCorrectamente = new EventEmitter<any>();

    this.key = '6LfzTncUAAAAAP99rAI6EFfbz4caukxBFAzPUAB_';

    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      tipo: ['Socio'],
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public Submit(): void {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    if (this.form.valid) {
      const usuario = this.form.get('usuario').value;
      const password = this.form.get('password').value;
      const nombre = this.form.get('name').value;
      const tipo = this.form.get('tipo').value;
      this.empleadoService.Registrar(usuario, password, nombre, tipo)
        .then(
          response => {
            console.log(response);
            if (response['Estado'] === 'OK') {
              this.success = true;
              this.form.reset();
              this.form.get('tipo').setValue('Socio');
              this.captcha.reloadCaptcha();
              this.captcha.resetCaptcha();
              this.registradoCorrectamente.emit();
            } else {
              this.error = true;
              this.errorMessage = response['Mensaje'];
            }
          }
        )
        .catch(
          error => {
            this.error = true;
            this.errorMessage = error['Mensaje'];
            console.error(error);
          }
        );
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }

}
