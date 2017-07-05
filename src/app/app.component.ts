import { Component } from '@angular/core';
import { Platform, ModalController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen]
})
export class MyApp {

  public session;
  rootPage: any = 'VerificacionPage';

  constructor(
    public app: App,
    public platform: Platform,
    private statusBar: StatusBar,
    public splashscreen: SplashScreen,
    private modalCtrl: ModalController,
  ) {
  }
  presentModal() {
    let modal = this.modalCtrl.create('ModalWifi');
    modal.present();
  }
  /*AlertBackButton() {
    let alert = this.AlertCrtl.create({
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
  }*/
}
