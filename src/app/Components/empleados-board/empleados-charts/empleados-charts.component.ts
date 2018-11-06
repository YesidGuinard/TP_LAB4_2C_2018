import { EmpleadoService } from './../../../Services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { OperacionesPorSector } from 'src/app/Model/OperacionesPorSector';

@Component({
  selector: 'app-empleados-charts',
  templateUrl: './empleados-charts.component.html',
  styleUrls: ['./empleados-charts.component.scss']
})
export class EmpleadosChartsComponent implements OnInit {
  chartOptions: Object; // required
  operacionesPorSector: OperacionesPorSector[];


  constructor(private empleadoService: EmpleadoService) {

    empleadoService.CantidadOperacionesPorSector().subscribe(response => {
      const datos: { name: String, y: number}[] = new Array();
      response.forEach(element => {
        datos.push({
          name: element.sector,
          y: parseInt(element.cantidad_operaciones, 10)
        });
      });

      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          style: {
            textAlign: 'center'
          }
        },
        title: {
          text: 'Porcentaje de Operaciones por Sector'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              connectorColor: 'silver'
            }
          }
        },
        series: [{
          name: 'Operaciones por Sector',
          data: datos
        }]
      };
    });
  }

  ngOnInit() {
  }
}
