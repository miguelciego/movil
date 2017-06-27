import { Component } from '@angular/core';
import { Platform, ModalController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';


@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen, Network]
})
export class MyApp {

  public session;
  rootPage: any = 'VerificacionPage';

  constructor(
    public app: App,
    public platform: Platform,
    private statusBar: StatusBar,
    public splashscreen: SplashScreen,
    public AlertCrtl: AlertController,
    private network: Network,
    private modalCtrl: ModalController
  ) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashscreen.hide();
      platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()) {
          nav.pop();
        } else {
          this.AlertBackButton();
        }
      });
      
      this.network.onConnect().subscribe(data => {
        console.log('onConnect', data)
      }, error => console.error(error));
      this.network.onDisconnect().subscribe(data => {
        console.log('onDisconnect', data)
        this.presentModal();
      }, error => console.error(error));
    });
  }
  presentModal() {
    let modal = this.modalCtrl.create('ModalWifi');
    modal.present();
  }
  AlertBackButton() {
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
  }
}
