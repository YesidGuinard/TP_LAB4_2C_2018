import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaComponent } from '../Components/bienvenida/bienvenida.component';
import { EmpleadosComponent } from '../Components/empleados/empleados.component';
import { ClientesComponent } from '../Components/clientes/clientes.component';
import { ClientesLoginComponent } from '../Components/clientes-login/clientes-login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  {
    path: 'Empleados', component: EmpleadosComponent
  },
  {
    path: 'Clientes', component: ClientesComponent,
    children: [
      {
        path: '',
        component: ClientesLoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: [
  ]
})
export class AppRoutingModule { }
