import { CaptchaService } from './Services/captcha.service';
import { CsvComponent } from './Components/Common/csv/csv.component';
import { EmpleadoService } from './Services/empleado.service';
import { EmpleadosRegistroComponent } from './Components/empleados-board/empleados-registro/empleados-registro.component';
import { EmpleadosListComponent } from './Components/empleados-board/empleados-list/empleados-list.component';
import { EmpleadosBoardComponent } from './Components/empleados-board/empleados-board.component';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpBase } from './Services/http-base.service';
import { PedidoService } from './Services/pedido.service';
import { EmpleadosLoginComponent } from './Components/empleados-login/empleados-login.component';
import { ErrorInterceptor } from './Services/Interceptors/ErrorInterceptor';
import { JwtInterceptor } from './Services/Interceptors/JWTInterceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerInterceptor } from './Services/Interceptors/SpinnerInterceptor';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ChartModule } from 'angular2-highcharts';
import { EmpleadosChartsComponent } from './Components/empleados-board/empleados-charts/empleados-charts.component';
import { Angular2CsvModule } from 'angular2-csv';
import { EmpleadosModifyComponent } from './Components/empleados-board/empleados-modify/empleados-modify.component';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { PedidosMesaComponent } from './Components/clientes/pedidos-mesa/pedidos-mesa.component';
import { OrdenarPipe } from './Pipes/ordenar.pipe';
import { EstadoPipe } from './Pipes/Estado.pipe';
import { SectorPipe } from './Pipes/Sector.pipe';
import { PanelDirective } from './Directives/panel.directive';
import { EstadoPedidoDirective } from './Directives/estado-pedido.directive';
import { AccionPedidoDirective } from './Directives/accion-pedido.directive';
import { MesaBoardComponent } from './Components/mesa-board/mesa-board.component';
import { MesaListComponent } from './Components/mesa-board/mesa-list/mesa-list.component';
import { MesaRegistroComponent } from './Components/mesa-board/mesa-registro/mesa-registro.component';
import { PedidosBoardComponent } from './Components/pedidos-board/pedidos-board.component';
import { PedidosRegistroComponent } from './Components/pedidos-board/pedidos-registro/pedidos-registro.component';
import { PedidosListComponent } from './Components/pedidos-board/pedidos-list/pedidos-list.component';
import { CaptchaComponent } from './Components/Common/captcha/captcha.component';
import { ValidarRolesDirective } from './Directives/validar-roles.directive';
import { FiltrarPorRolPipe } from './Pipes/filtrar-por-rol.pipe';

export function getAccessToken() {
  return localStorage.getItem('token');
}

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/exporting');
  dd(hc);

  return hc;
}


@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    NavegacionComponent,
    ClientesComponent,
    EmpleadosComponent,
    EmpleadosLoginComponent,
    EmpleadosBoardComponent,
    EmpleadosListComponent,
    EmpleadosRegistroComponent,
    EmpleadosChartsComponent,
    EmpleadosModifyComponent,
    CsvComponent,
    PedidosMesaComponent,
    OrdenarPipe,
    EstadoPipe,
    SectorPipe,
    PanelDirective,
    EstadoPedidoDirective,
    AccionPedidoDirective,
    MesaBoardComponent,
    MesaListComponent,
    MesaRegistroComponent,
    PedidosBoardComponent,
    PedidosRegistroComponent,
    PedidosListComponent,
    CaptchaComponent,
    ValidarRolesDirective,
    FiltrarPorRolPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    NoopAnimationsModule,
    NgxSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    Angular2CsvModule,
    MatExpansionModule,
    ChartModule,
    [JwtModule.forRoot({
      config: {
        tokenGetter: (getAccessToken),
        whitelistedDomains: ['https://mauriciocerizza.github.io', 'localhost:4200']
      }
    })]
  ],
  providers: [
    HttpBase,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    PedidoService,
    JwtHelperService,
    EmpleadoService,
    NgxSpinnerService,
    CaptchaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
