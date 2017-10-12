import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
  providers: [CpsProviders]
})
export class Historial {

  query: Subscription;
  cancel: boolean = false;

  private infinite: any = 1000000000000000000000000000000000000;
  private myPaciente;
  private historial;
  private length: number;
  private errorApi: boolean;
  public icon = "add-circle";
  private dpts;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private cps: CpsProviders,
    private toastCtrl: ToastController,
    private LoadCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    this.myPaciente = navParams.get('myPaciente');
    this.dpts = navParams.get('dpts');
  }
  ionViewDidLoad() {
    this.cancel = true;
    this.length = 0;
    this.errorApi = false;
    this.query = this.cps.getHistorial(this.dpts, this.myPaciente.Codigo)
      .subscribe(data => {
        this.historial = data.json();
        this.length = this.historial.length;
        console.log("historial", this.historial)
        if (this.length == 0) { this.length = this.infinite; }
      },
      err => {
        console.log(err.status);
        this.length = 1;
        this.errorApi = true;
        this.toastError();
      },
      () => console.log("HistorialPage => Proceso terminado")
      );

  }
  ionViewWillLeave() {
    if (this.cancel == true) { this.query.unsubscribe(); }
  }
  VerDetalle(receta) {
    this.icon = "remove-circle"
  }
  toggleSection(i) {
    this.historial[i].open = !this.historial[i].open;
  }
  toggleItem(i, j) {
    this.historial[i].children[j].open = !this.historial[i].children[j].open;
  }
  historialFicha(item) {
    this.presentModal(item);
  }
  presentModal(item) {
    let modal = this.modalCtrl.create('ModalHistorial', { ficha: item, myPaciente: this.myPaciente });
    modal.present();
  }
  volver() {
    this.navCtrl.pop();
  }
  toastError() {
    let toast = this.toastCtrl.create({
      message: 'Se ha producido un error. Inténtalo más tarde',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
