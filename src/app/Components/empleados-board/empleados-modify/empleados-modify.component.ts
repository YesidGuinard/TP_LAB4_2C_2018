import { EmpleadoService } from './../../../Services/empleado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empleados-modify',
  templateUrl: './empleados-modify.component.html',
  styleUrls: ['./empleados-modify.component.scss']
})
export class EmpleadosModifyComponent implements OnInit {
  @Input() showModal: boolean;
  @Output() closeModal: EventEmitter<void>;
  @Output() modificadoCorrectamente: EventEmitter<void>;
  id: number;
  usuario: string;
  nombre: string;
  tipo: string;
  form: FormGroup;
  errorMessage: string;
  error: boolean;

  constructor(private fb: FormBuilder, private empleadoService: EmpleadoService) {
    this.form = this.fb.group({
      usuario: [''],
      name: [''],
      tipo: ['']
    });

    this.modificadoCorrectamente = new EventEmitter<void>();
    this.closeModal = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  cargarModal(id: number, usuario: string, nombre: string, tipo: string) {
    this.id = id;
    this.nombre = nombre;
    this.usuario = usuario;
    this.tipo = tipo;
    this.cargarForm();
  }

  private cargarForm() {
    this.form = this.fb.group({
      usuario: [this.usuario, Validators.required],
      name: [this.nombre, Validators.required],
      tipo: [this.tipo]
    });
  }

  Restablecer() {
    this.cargarForm();
  }

  Submit() {
    this.errorMessage = '';
    this.error = false;
    if (this.form.valid) {
      const usuario = this.form.get('usuario').value;
      const nombre = this.form.get('name').value;
      const tipo = this.form.get('tipo').value;
      this.empleadoService.Modificar(usuario, this.id, nombre, tipo)
        .then(
          response => {
            console.log(response);
            if (response['Estado'] === 'OK') {
              this.modificadoCorrectamente.emit();
              this.closeModal.emit();
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

  cerrar() {
    this.closeModal.emit();
  }
}
