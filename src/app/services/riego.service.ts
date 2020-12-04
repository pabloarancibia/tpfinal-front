import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Riego } from '../model/Riego';

@Injectable({
  providedIn: 'root'
})
export class RiegoService {
  urlApi = "http://localhost:3000";


  constructor(private _http: HttpClient) { }

  agregarRiego(riego: Riego) {
    return this._http.post(this.urlApi + '/api/riego/agregar',
      {
        apertura: riego.apertura,
        fecha: riego.fecha,
        electrovalvulaId: riego.electrovalvulaId,
      }).toPromise().then((result) => {
        return result;
      });
  }

  getRiegosByIdValvula(id): Promise<Riego[]> {
    return this._http.get(this.urlApi + "/api/riego/" + id + "/todas").toPromise().then((riegos: Riego[]) => {
      return riegos;
    });
  }

}
