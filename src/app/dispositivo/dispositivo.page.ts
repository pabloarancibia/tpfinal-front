import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleSensorPage } from '../detalle-sensor/detalle-sensor.page';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  // Importo e instancio de model Dispositivo
  public dispositivo: Dispositivo;
  public idDispositivo: string;

  public sensor: DetalleSensorPage;

  // Inyectamos la dependencia ActivatedRoute (recupera el parámetro de la ruta)
  // Inyectamos el service DispositivoService
  constructor(private router: ActivatedRoute, private dServ: DispositivoService) { }

  ngOnInit() {
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dServ.getDispositivo(this.idDispositivo).then(
      (dispositivo) => {
        this.dispositivo = dispositivo;
        console.log(this.dispositivo);
      }
    );

    // this.sensor.generarChart();
  }

}
