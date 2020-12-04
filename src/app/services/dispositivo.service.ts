import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  // url del backend
  urlBack = 'http://localhost:3000/api/';

  constructor(private _http: HttpClient) { }

  // metodo que devuelve promesa de array de dispositivo
  getDispositivos(): Promise<Dispositivo[]> {
    return this._http.get(this.urlBack + 'dispositivo').toPromise().then(
      (dispositivo: Dispositivo[]) => {
        return dispositivo;
      });
  }

  getDispositivo(id): Promise<Dispositivo> {
    return this._http.get(this.urlBack + 'dispositivo/' + id).toPromise().then(
      (dispositivo: Dispositivo) => {
        return dispositivo;
      });
  }
}
