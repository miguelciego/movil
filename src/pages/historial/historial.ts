import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
  providers: [CpsProviders]
})
export class Historial {

  private myPaciente;
  private historial;
  private length;
  public icon="add-circle";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cps: CpsProviders,
    private toastCtrl:ToastController,
    public LoadCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    this.myPaciente = navParams.get('myPaciente');
    this.historial = navParams.get('historial');
    this.length = navParams.get('length');
  }

  ionViewDidLoad() {
  }
  VerDetalle(receta){
    this.icon = "remove-circle"
  }
  toggleSection(i) {
    this.historial[i].open = !this.historial[i].open;
  }
   toggleItem(i, j) {
    this.historial[i].children[j].open = !this.historial[i].children[j].open;
  }
  historialFicha(item){
     this.presentModal(item);
  }
  presentModal(item) {
    let modal = this.modalCtrl.create('ModalHistorial',{ ficha : item, myPaciente: this.myPaciente });
    modal.present();
  }
  volver() {
    this.navCtrl.pop();
  }
}
