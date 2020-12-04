// correr antes npm install --save highcharts
import { Component, OnInit } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Medicion } from '../model/Medicion';
import { MedicionService } from '../services/medicion.service';
// import { Location } from '@angular/common';



import * as Highcharts from 'highcharts';
import { RiegoService } from '../services/riego.service';
import { Riego } from '../model/Riego';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-detalle-sensor',
  templateUrl: './detalle-sensor.page.html',
  styleUrls: ['./detalle-sensor.page.scss'],
})
export class DetalleSensorPage implements OnInit {

  private valorObtenido: number = 0;
  public myChart;
  private chartOptions;

  // Importo e instancio de model Dispositivo y Medicion
  public dispositivo: Dispositivo;
  public idDispositivo: string;
  public medicion: Medicion;

  // true: abierto, false: cerrado
  private estadoValvula = false;




  constructor(
    private rServ: RiegoService,
    private Arouter: ActivatedRoute,
    private dServ: DispositivoService,
    private mServ: MedicionService
  ) {

    this.obtenerDatos();

  }

  ngOnInit() {

  }

  obtenerDatos() {

    // recupero id dispositivo
    this.idDispositivo = this.Arouter.snapshot.paramMap.get('id');

    // traigo dispositivo segun id
    this.dServ.getDispositivo(this.idDispositivo).then(
      (dispositivo) => {
        this.dispositivo = dispositivo;
        console.log(this.dispositivo);
      }
    );

    // traigo última medicion del dispositivo segun su id
    this.mServ.getMedicionByIdDispositivo(this.idDispositivo).then((med) => {
      this.medicion = med;
      console.log(this.medicion);

      // recupero el valor de la medicion
      this.valorObtenido = Number(this.medicion.valor);

      // crear gráfico
      this.generarChart();

    }); // cierro mServ
  }

  // ionViewDidEnter() {
  //    this.generarChart();
  // }

  generarChart() {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      }
      , title: {
        text: [this.dispositivo.nombre]
      }

      , credits: { enabled: false }


      , pane: {
        startAngle: -150,
        endAngle: 150
      }
      // the value axis
      , yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: 'kPA'
        },
        plotBands: [{
          from: 0,
          to: 10,
          color: '#55BF3B' // green
        }, {
          from: 10,
          to: 30,
          color: '#DDDF0D' // yellow
        }, {
          from: 30,
          to: 100,
          color: '#DF5353' // red
        }]
      }
      ,

      series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' kPA'
        }
      }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions);
  }



  accionarValvula() {
    const current_datetime = new Date();
    const formatted_date = current_datetime.getFullYear() + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getDate() + ' ' + current_datetime.getHours() + ':' + current_datetime.getMinutes() + ':' + current_datetime.getSeconds();

    if (!this.estadoValvula) {
      // abro valvula registro log riego
      const riego: Riego = new Riego(99, 1, formatted_date, this.dispositivo.electrovalvulaId);
      this.rServ.agregarRiego(riego).then((riego) => {

      });
    } else {
      // cierro valvula registro log riego
      const riego: Riego = new Riego(99, 0, formatted_date, this.dispositivo.electrovalvulaId);
      this.rServ.agregarRiego(riego).then((riego) => {
        console.log(riego);
      });
      // inserto nueva medición
      const random = (Math.trunc(Math.random() * (100)));
      let a: Medicion = new Medicion(99, formatted_date, random, this.dispositivo.dispositivoId);

      this.mServ.agregarMedicion(a).then((med) => {
        console.log(med);
        console.log(random);
      });
    }
    this.estadoValvula = !this.estadoValvula;
  }
}
