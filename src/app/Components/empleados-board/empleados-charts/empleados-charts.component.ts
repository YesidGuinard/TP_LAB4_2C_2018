import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-empleados-charts',
  templateUrl: './empleados-charts.component.html',
  styleUrls: ['./empleados-charts.component.scss']
})
export class EmpleadosChartsComponent implements OnInit {
  Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions = {  }; // required
  chartCallback = function (chart) { } // optional function, defaults to null
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false
  constructor() { }

  ngOnInit() {
  }

}
