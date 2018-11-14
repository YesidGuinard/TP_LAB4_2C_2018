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

  cambiarEstado(estado: number, codigo: string) {
    switch (estado) {
      case 1:
        this.mesasService.CambiarEstadoEsperando(codigo).then( () => {
          this.cargarLista();
        });
        break;
      case 2:
        this.mesasService.CambiarEstadoComiendo(codigo).then( () => {
          this.cargarLista();
        });
        break;
      case 3:
        this.mesasService.CambiarEstadoPagando(codigo).then( () => {
          this.cargarLista();
        });
        break;
      case 4:
        this.mesasService.CambiarEstadoCerrada(codigo).then( () => {
          this.cargarLista();
        });
        break;
    }
    this.cargarLista();
  }

  eliminar(codigo: string) {
    this.mesasService.Eliminar(codigo).then( () => {
      this.cargarLista();
    });
  }

  cobrar(codigo: string) {
    this.mesasService.Cobrar(codigo).then( () => {
      this.mesasService.CambiarEstadoCerrada(codigo).then( () => {
        this.cargarLista();
      });
    });
  }

}
