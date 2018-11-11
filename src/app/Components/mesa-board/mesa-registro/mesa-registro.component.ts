import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ReCaptcha2Component } from 'ngx-captcha';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Registro } from '../../Common/Registro';
import { MesasService } from 'src/app/Services/mesas.service';

@Component({
  selector: 'app-mesa-registro',
  templateUrl: './mesa-registro.component.html',
  styleUrls: ['./mesa-registro.component.scss']
})
export class MesaRegistroComponent extends Registro implements OnInit {

  file;

  constructor(private fb: FormBuilder, private mesasService: MesasService) {
    super();
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      foto: [''],
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.file = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(',')[1]
        };
      };
    }
  }

  ValidarFoto(foto): Boolean {
    if (foto) {
      return (foto.filetype === 'image/jpeg'
      || foto.filetype === 'image/png'
      || foto.filetype === 'image/gif');
    } else {
      return true;
    }
  }

  Submit() {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    const fotoValida = this.ValidarFoto(this.file);
    if (this.form.valid && fotoValida) {
      console.log(this.file.value);
      const codigo = this.form.get('codigo').value;
      this.mesasService.Registrar(codigo, this.file)
        .then(
          response => {
            console.log(response);
            if (response['Estado'] === 'OK') {
              this.success = true;
              this.form.reset();
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
    } else if (!fotoValida) {
      this.errorMessage = 'El archivo debe ser una imagen.';
      this.error = true;
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }

}
