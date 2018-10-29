import { EmpleadosListComponent } from './empleados-list/empleados-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-empleados-board',
  templateUrl: './empleados-board.component.html',
  styleUrls: ['./empleados-board.component.scss']
})
export class EmpleadosBoardComponent implements OnInit {

  @ViewChild(EmpleadosListComponent)
  private listComponent: EmpleadosListComponent;

  constructor() { }

  ngOnInit() {
  }

  recargarLista() {
    this.listComponent.cargarLista();
  }

}
