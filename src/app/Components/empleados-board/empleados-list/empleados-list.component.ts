import { EmpleadosModifyComponent } from './../empleados-modify/empleados-modify.component';
import { Angular2CsvComponent} from 'angular2-csv';
import { Empleado } from './../../../Model/Empleado';
import { EmpleadoService } from './../../../Services/empleado.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.scss']
})
export class EmpleadosListComponent implements OnInit {
  @ViewChild('modalModify') modalModify: EmpleadosModifyComponent;
  public listaEmpleados: Empleado[];
  options: Object = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    headers: ['Nombre', 'Tipo', 'Usuario', 'Fecha de Registro', 'Último Login', 'Estado', 'N° de Operaciones'],
    showTitle: true,
    title: 'Lista de Empleados',
    useBom: true,
    removeNewLines: true,
    keys: ['nombre', 'tipo', 'usuario', 'fechaRegistro', 'ultimoLogin', 'estado', 'cantidad_operaciones']
  };
  data: Object[];

  modalUser: string;
  modalId: number;
  modalType: string;
  modalName: string;
  showModal: boolean;

  constructor(private empleadoService: EmpleadoService) {
    this.cargarLista();
  }

  ngOnInit() {
  }

  public cargarLista() {
    this.empleadoService.Listar().subscribe(
      data => {
        this.listaEmpleados = data;
        this.data = this.listaEmpleados;
      },
      error => {
        console.error(error);
      }
    );
  }

  showModifyModal(empleado: Empleado) {
    this.modalModify.cargarModal(empleado.id, empleado.usuario, empleado.nombre, empleado.tipo);
    this.showModal = true;
  }

  generarNombreCsv(): string {
    const nombre = 'ListaEmpleados ' + new Date().toDateString();
    return nombre;
  }

  darDeBaja(id: number) {
    this.empleadoService.Baja(id).then( response => {
      this.cargarLista();
    },
    error => {
      console.error(error);
    });
  }

  suspender(id: number) {
    this.empleadoService.Suspender(id).then( response => {
      this.cargarLista();
    },
    error => {
      console.error(error);
    });
  }

  activar(id: number) {
    this.empleadoService.Activar(id).then( response => {
      this.cargarLista();
    },
    error => {
      console.error(error);
    });
  }
}
