import { Mesa } from './../../../Model/Mesa';
import { MesasService } from 'src/app/Services/mesas.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mesa-list',
  templateUrl: './mesa-list.component.html',
  styleUrls: ['./mesa-list.component.scss']
})
export class MesaListComponent implements OnInit {
  mesasList: Mesa[];
  foto;

  constructor(private mesasService: MesasService, private domSanitizer: DomSanitizer) {
    this.cargarLista();
  }

  ngOnInit() {
  }

  cargarLista() {
    this.mesasService.Listar().subscribe( response => {
      this.mesasList = response;
    });
  }

}
