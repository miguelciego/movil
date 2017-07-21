import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

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
    private LoadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.Medico = navParams.get('Medico');
    this.Ficha = navParams.get('Ficha');
    this.rlength = navParams.get('length');
    this.Horario =  navParams.get('Horario');

    this.Ficha.MedicoCodigo = this.Medico.Valor;
    this.Ficha.MedicoNombre = this.Medico.Descripcion;

    console.log("result", this.Horario)
    
  }
  ionViewDidLoad() {
    /*let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.cps.getHorarios(this.Ficha.dpts, this.Ficha.FilialCodigo, this.Ficha.EspecialidadCodigo, this.Ficha.MedicoCodigo, this.Ficha.Fecha)
      .subscribe(data => {
        this.Horarios = data.json();
        this.length = this.Horarios.length;
      },
      err => {
        if (err.status == 404) {
        } else {
          console.log(err.status);
          this.AlertError();
        }
      },
      () => console.log('Completado : horarioPage')
      );*/
  }
  irResumen(Hora) {
    this.navCtrl.push('ResumenPage', { Hora: Hora, Ficha: this.Ficha });
  }
  volver() {
    this.navCtrl.pop();
  }
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [
        {
          text: 'Listo',
          handler: () => {
            this.navCtrl.popToRoot()
            this.ToastAlertError();
          }
        }
      ]
    });
    alert.present();
  }
  ToastAlertError() {
    let toast = this.toastCtrl.create({
      message: 'Problemas del Servidor, Vuelve a intentarlo más tarde.',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}
