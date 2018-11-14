import { MenuService } from './../../../Services/menu.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MesasService } from 'src/app/Services/mesas.service';
import { Component, OnInit } from '@angular/core';
import { Registro } from '../../Common/Registro';
import { PedidoService } from 'src/app/Services/pedido.service';
import { Mesa } from 'src/app/Model/Mesa';
import { Menu } from 'src/app/Model/Menu';

@Component({
  selector: 'app-pedidos-registro',
  templateUrl: './pedidos-registro.component.html',
  styleUrls: ['./pedidos-registro.component.scss']
})
export class PedidosRegistroComponent extends Registro implements OnInit {

  mesas: Mesa[];
  menuList: Menu[];

  constructor(private fb: FormBuilder, private mesasService: MesasService
    , private pedidoService: PedidoService, private menuService: MenuService) {
    super();
    this.resetForm();
  }

  ngOnInit() {
  }

  resetForm() {
    this.form = this.fb.group({
      cliente: ['', Validators.required],
      mesa: [0],
      menu: [0]
    });

    this.mesasService.Listar().subscribe(response => {
      this.mesas = response;
      if (this.mesas) {
        this.form.get('mesa').setValue(this.mesas[0].codigo);
      }
    });
    this.menuService.Listar().subscribe(response => {
      this.menuList = response;
      if (this.menuList) {
        this.form.get('menu').setValue(this.menuList[0].id);
      }
    });
  }

  Submit() {
    this.errorMessage = '';
    this.error = false;
    this.success = false;
    if (this.form.valid) {
      const cliente = this.form.get('cliente').value;
      const idMesa = this.form.get('mesa').value;
      const idMenu = this.form.get('menu').value;
      this.pedidoService.Registrar(idMesa, idMenu, cliente)
        .then(
          response => {
            console.log(response);
            if (response['Estado'] === 'OK') {
              this.success = true;
              this.resetForm();
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
    } else {
      this.errorMessage = 'Debe completar los campos correctamente.';
      this.error = true;
    }
  }

}
