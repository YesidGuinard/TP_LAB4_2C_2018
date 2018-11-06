import { Angular2CsvComponent} from 'angular2-csv';
import { Empleado } from './../../../Model/Empleado';
import { EmpleadoService } from './../../../Services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.scss']
})
export class EmpleadosListComponent implements OnInit {

  public listaEmpleados: Empleado[];
  options: Object = {
    fieldSeparator: ',',
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
      }
    );
  }

  generarNombreCsv(): string {
    const nombre = 'ListaEmpleados ' + new Date().toDateString();
    return nombre;
  }
}
