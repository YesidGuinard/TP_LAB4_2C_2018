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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpBase } from './Services/http-base.service';
import { PedidoService } from './Services/pedido.service';
import { EmpleadosLoginComponent } from './Components/empleados-login/empleados-login.component';
import { ErrorInterceptor } from './Services/Interceptors/ErrorInterceptor';
import { JwtInterceptor } from './Services/Interceptors/JWTInterceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    NavegacionComponent,
    ClientesComponent,
    EmpleadosComponent,
    EmpleadosLoginComponent
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
    MatExpansionModule,
    [JwtModule.forRoot({
      config: {
        tokenGetter(): string {
          return '';
        }
      }
    })]
  ],
  providers: [
    HttpBase,
    PedidoService, 
    ErrorInterceptor,
    JwtInterceptor, 
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
