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
  id: number;
  usuario: string;
  nombre: string;
  tipo: string;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      usuario: [''],
      name: [''],
      tipo: ['']
    });

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
    console.log('Probando');
  }

  cerrar() {
    this.closeModal.emit();
  }
}
