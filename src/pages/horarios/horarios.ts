import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-horarios',
  templateUrl: 'horarios.html',
  providers: [CpsProviders]

})
export class HorariosPage {

  private Medico;
  private Horario;
  private Ficha;
  private rlength;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private cps: CpsProviders,
    private LoadCtrl: LoadingController
  ) {
    this.Medico = navParams.get('Medico');
    this.Ficha = navParams.get('Ficha');
    this.rlength = navParams.get('length');
    this.Horario =  navParams.get('Horario');

    this.Ficha.MedicoCodigo = this.Medico.Valor;
    this.Ficha.MedicoNombre = this.Medico.Descripcion;  
  }
  irResumen(Hora) {
    this.navCtrl.push('ResumenPage', { Hora: Hora, Ficha: this.Ficha });
  }
  
  volver() {
    this.navCtrl.pop();
  }
}
