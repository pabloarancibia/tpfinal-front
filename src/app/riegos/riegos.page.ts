import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Riego } from '../model/Riego';
import { RiegoService } from '../services/riego.service';

@Component({
  selector: 'app-riegos',
  templateUrl: './riegos.page.html',
  styleUrls: ['./riegos.page.scss'],
})
export class RiegosPage implements OnInit {
  public idValvula: string;
  public riegos: Riego[];
  public nomValvula = 0;

  constructor(
    private Arouter: ActivatedRoute,
    private rServ: RiegoService,
  ) {
    this.idValvula = this.Arouter.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.rServ.getRiegosByIdValvula(this.idValvula).then((riegos) => {
      this.riegos = riegos;
      this.nomValvula = this.riegos[0].electrovalvulaId;
      console.log(this.riegos);
    });
  }

}
