import { Component } from '@angular/core';
import { IonicPage, App, ViewController, Platform, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { AfiliadoStorage } from '../../providers/afiliado-storage';

@IonicPage()
@Component({
  selector: 'page-verificacion',
  templateUrl: 'verificacion.html',
  providers: [AfiliadoStorage, Network]
})
export class VerificacionPage {

  constructor(
    public AfiliadoStorage: AfiliadoStorage,
    private network: Network,
    public platform: Platform,
    public viewCtrl: ViewController,
    public appCtrl: App,
    private toastCtrl:ToastController
  ) { 
    platform.ready().then(() => {
      if (true) {
        this.network.onDisconnect().subscribe(data => {
          console.log('onDisconnect', data)
          this.DesconectadoToast()
          //this.presentModal();
        }, error => console.error(error));

        this.network.onConnect().subscribe(data => {
          console.log('onConnect', data)
          this.dismiss()
          this.conectadoToast();
        }, error => console.error(error));
      }

    });
  }

  ionViewDidLoad() {
    this.Session();
  }
  Session() {
    this.AfiliadoStorage.getAll()
      .then((afiliado: any[]) => {
        console.log('data', afiliado);
        if (afiliado == null) {
          console.log("verificacionPage storage =>", afiliado)
          this.appCtrl.getRootNav().setRoot('LoginPage');
        } else {
          this.appCtrl.getRootNav().setRoot('MitabPage');
        }
      })
      .catch(error => {
        this.appCtrl.getRootNav().setRoot('MitabPage');
        console.log(error)
      })
  }
  DesconectadoToast() {
    let toast = this.toastCtrl.create({
      message: 'Sin Conexión, Verifica tus datos móviles o wifi.',
      position: 'top',
      cssClass:'error',
      duration: 5000
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  conectadoToast() {
    let toast = this.toastCtrl.create({
      message: 'Conectado',
      position: 'top',
      cssClass:'success',
      duration: 5000
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
