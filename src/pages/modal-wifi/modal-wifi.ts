import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, App, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-modal-wifi',
  templateUrl: 'modal-wifi.html',
  providers: [Network]
})
export class ModalWifi {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl:ViewController,
    public alertCtrl:AlertController,
    public platform: Platform, 
    private network:Network,
    public app:App
    ) {}

  ionViewDidLoad(){
    this.network.onConnect().subscribe(data => {
      console.log('onConnect',data)
      this.viewCtrl.dismiss();
    }, error => console.error(error));
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
