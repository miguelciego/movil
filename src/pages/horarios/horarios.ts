import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-horarios',
  templateUrl: 'horarios.html',
  providers: [CpsProviders]

})
export class HorariosPage {

  private Horario = [];
  private Ficha;
  private length;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private cps: CpsProviders,
    private LoadCtrl: LoadingController
  ) {
    this.Ficha = navParams.get('Ficha');
    this.Horario = navParams.get('Horario');
    this.length = this.Horario.length;
  }

  irResumen(Hora) {
    this.navCtrl.push('ResumenPage', { Hora: Hora, Ficha: this.Ficha });
  }

  volver() {
    this.navCtrl.pop();
  }
}
