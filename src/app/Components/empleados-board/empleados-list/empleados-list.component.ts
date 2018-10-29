import { Empleado } from './../../../Model/Empleado';
import { EmpleadoService } from './../../../Services/empleado.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.scss']
})
export class EmpleadosListComponent implements OnInit {

  public listaEmpleados: Empleado[];

  constructor(private empleadoService: EmpleadoService) {
    this.cargarLista();
  }

  ngOnInit() {
  }

  public cargarLista() {
    this.empleadoService.Listar().subscribe(
      data => {
        this.listaEmpleados = data;
      }
    );
  }
}
