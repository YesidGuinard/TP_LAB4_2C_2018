import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './Components/bienvenida/bienvenida.component';
import { AppRoutingModule } from './Routes/app-routing.module';
import { NavegacionComponent } from './Components/navegacion/navegacion.component';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { EmpleadosComponent } from './Components/empleados/empleados.component';
import { MatSidenavModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatIconModule
  , MatExpansionModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClientesLoginComponent } from './Components/clientes-login/clientes-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpBase } from './Services/http-base.service';
import { PedidoService } from './Services/pedido.service';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    NavegacionComponent,
    ClientesComponent,
    EmpleadosComponent,
    ClientesLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    NoopAnimationsModule, 
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule 
  ],
  providers: [
    HttpBase,
    PedidoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
