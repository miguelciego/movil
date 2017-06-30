import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
  providers: [CpsProviders]
})
export class Historial {

  public myPaciente;
  public historial;
  public icon="add-circle";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cps: CpsProviders,
    private toastCtrl:ToastController,
    public LoadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.myPaciente = navParams.get('myPaciente');
    console.log("codigo es ", this.myPaciente)
  }

  ionViewDidLoad() {
    let load = this.LoadCtrl.create({
      content: 'Cargando...'
    });
    load.present();
    this.cps.getHistorial(this.myPaciente.Codigo)
    .subscribe(data => { 
        this.historial = data.json();
        console.log("Historial",this.historial);
        this.presentToast(this.historial.length)
         //load.dismiss();
        },
      err => { if (err.status == 404) {
        } else {
            console.log(err.status);
            load.dismiss()
            this.AlertError();
          }
          
        },
      () =>  load.dismiss()
    ); 
  }
  presentToast(lenght) {
    let toast = this.toastCtrl.create({
      message: 'Se ha encontrado ' + lenght + ' fichas',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
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
  AlertError() {
   
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [{ text: 'Bueno', handler: () => { this.navCtrl.pop();} }]
    });
    alert.present();
  }
  historialFicha(item){
    console.log("paso por aqui")
     this.presentModal(item);
  }
  presentModal(item) {
    let modal = this.modalCtrl.create('ModalHistorial',{ ficha : item, myPaciente: this.myPaciente });
    modal.present();
  }
}
