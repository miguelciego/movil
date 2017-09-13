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
  private infinite:any= 1000000000000000000000000000000000000;
  private myPaciente;
  private historial;
  private length:any = 0;
  private errorApi: boolean;
  public icon = "add-circle";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cps: CpsProviders,
    private toastCtrl: ToastController,
    public LoadCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    this.myPaciente = navParams.get('myPaciente');
  }
  
  ionViewDidLoad() {
    this.cancel = true;
    this.query = this.cps.getHistorial(this.myPaciente.Codigo)
      .subscribe(data => {
        this.historial = data.json();
        this.length = this.historial.length;
        if (this.length == 0) {this.length = this.infinite}
      },
      err => {
        console.log(err.status);
        this.length = 1;
        this.errorApi = true;
        this.toastError();
      },
      () => console.log("Termino historial")
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
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}
