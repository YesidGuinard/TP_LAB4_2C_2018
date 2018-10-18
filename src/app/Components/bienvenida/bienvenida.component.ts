import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PedidoService } from '../../Services/pedido.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {

  private mesaGroup: FormGroup;
  public respuestaInvalida : boolean;

  constructor(private fb: FormBuilder, private pedidoService: PedidoService) {
    this.mesaGroup = this.fb.group({
      mesa: ['', [Validators.required, Validators.pattern('^MES\\d{2}')]]
    });
    this.respuestaInvalida = false;
  }

  ngOnInit() {
  }

  public ValidarMesa() {
    if(this.mesaGroup.get('mesa').valid){
      let codigoMesa: string = this.mesaGroup.get('mesa').value;
      this.pedidoService.ListarPorMesa(codigoMesa).subscribe(
        response => {
          if(response.length == 0){
            this.respuestaInvalida = true;
          }
          else{
            
          }
        });
    }
    else{
      this.mesaGroup.get('mesa').markAsTouched();
    }
  }

}
