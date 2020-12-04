import { Component } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listadoDisp: Dispositivo[];

  // Instancio de Service Dispositivo
  constructor(public dispositivoService: DispositivoService) {

    // busco dispositivos
    this.dispositivoService.getDispositivos().then((dispositivo) => {
      this.listadoDisp = dispositivo;
    });

  }



}
