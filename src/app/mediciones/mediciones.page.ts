import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { Medicion } from '../model/Medicion';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';


@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {

  public idDispositivo: string;
  public mediciones: Medicion[];
  public dispositivo: Dispositivo;
  public nomDisp = '';


  constructor(
    private Arouter: ActivatedRoute,
    private dServ: DispositivoService,
    private mServ: MedicionService,
  ) {
    // recupero id dispositivo
    this.idDispositivo = this.Arouter.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    // traigo dispositivo segun id
    this.dServ.getDispositivo(this.idDispositivo).then(
      (disp) => {
        this.dispositivo = disp;
        this.nomDisp = this.dispositivo.nombre;
        console.log(this.dispositivo);
      }
    );

    this.getMediciones();
  }

  getMediciones() {
    this.mServ.getMedicionesByIdDispositivo(this.idDispositivo).then((med) => {
      this.mediciones = med;
      console.log(med);
    });
  }

}
