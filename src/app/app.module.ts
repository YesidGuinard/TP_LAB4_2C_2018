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
import { ReCaptcha2Component } from 'ngx-captcha';
import { ChartModule } from 'angular2-highcharts';
import { EmpleadosChartsComponent } from './Components/empleados-board/empleados-charts/empleados-charts.component';
import { Angular2CsvModule } from 'angular2-csv';

export function getAccessToken() {
  return localStorage.getItem('token');
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
    CsvComponent
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
    ChartModule.forRoot(
    require('highcharts'),
    require('highcharts/modules/exporting')),
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
    PedidoService,
    JwtHelperService,
    EmpleadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
