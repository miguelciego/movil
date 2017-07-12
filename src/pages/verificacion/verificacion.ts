import { Component } from '@angular/core';
import { IonicPage, App, ViewController, Platform, ToastController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { AfiliadoStorage } from '../../providers/afiliado-storage';

import { CpsProviders } from '../../providers/cps';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-verificacion',
  templateUrl: 'verificacion.html',
  providers: [CpsProviders, AfiliadoStorage]
})
export class VerificacionPage {

  connected: Subscription;
  disconnected: Subscription;
  private departamental;

  constructor(
    public AfiliadoStorage: AfiliadoStorage,
    private network: Network,
    public platform: Platform,
    public viewCtrl: ViewController,
    public appCtrl: App,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public cps: CpsProviders
  ) {
    this.Session();
  }
  Session() {
    this.AfiliadoStorage.getAll()
      .then((afiliado: any[]) => {
        console.log('data', afiliado);
        if (afiliado == null) {
          console.log("verificacionPage storage =>", afiliado)
          this.cps.getDepartamental()
            .subscribe(data => {
              this.departamental = data.json();
              console.log("departamental", this.departamental);
              this.appCtrl.getRootNav().setRoot('LoginPage', { departamental: this.departamental });
            },
            err => {
              if (err.status == 404) {
              } else {
                console.log(err.status);
                this.AlertError();
              }
            },
            () => console.log("asd")
            );
        } else {
          this.appCtrl.getRootNav().setRoot('MitabPage');
        }
      })
      .catch(error => {
        this.appCtrl.getRootNav().setRoot('MitabPage');
        console.log(error)
      })
  }
  /*DesconectadoToast() {
    let toast = this.toastCtrl.create({
      message: 'Sin conexión, Verifica tus datos móviles o wifi.',
      position: 'top',
      cssClass: 'error',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }*/
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      cssClass: 'alertError',
      buttons: [{
        text: 'Bueno', handler: () => {
          this.platform.exitApp();
        }
      }]
    });
    alert.present();
  }
}
