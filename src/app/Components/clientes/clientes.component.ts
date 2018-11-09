import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  codigoMesa: string;
  constructor(
  private route: ActivatedRoute,
  private router: Router
) {}

  ngOnInit() {
    this.route.paramMap.subscribe( x => {
      this.codigoMesa = x.get('codMesa');
      console.log(this.codigoMesa);
    });
  }

}
