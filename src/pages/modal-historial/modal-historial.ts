import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-historial',
  templateUrl: 'modal-historial.html',
})
export class ModalHistorial {

  private myPaciente: any = [];
  private ficha: any = [];
  private txtAtendido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public platform: Platform,
    private alertCtrl: AlertController
  ) {
    this.myPaciente = navParams.get('myPaciente');
    this.ficha = navParams.get('ficha');
  }

  ionViewDidLoad() {
    if (this.ficha.atendido == 1) {
      this.txtAtendido = "ha asistido a su cita médica."
    } else {
      this.txtAtendido = "no ha asistido a su cita médica."
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  AlertBackButton() {
    let alert = this.alertCtrl.create({
      title: '¿ Desea salir de la Aplicacíon ?',
      buttons: [
        {
          text: 'No',
          role: 'No',
          handler: () => {
            console.log('No');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log("salio de la aplicacion")
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}
