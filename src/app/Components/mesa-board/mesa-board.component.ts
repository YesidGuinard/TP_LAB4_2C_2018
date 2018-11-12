import { MesaListComponent } from './mesa-list/mesa-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mesa-board',
  templateUrl: './mesa-board.component.html',
  styleUrls: ['./mesa-board.component.scss']
})
export class MesaBoardComponent implements OnInit {

  @ViewChild(MesaListComponent)
  private listComponent: MesaListComponent;

  constructor() { }

  ngOnInit() {
  }

  recargarLista() {
    this.listComponent.cargarLista();
  }

}
