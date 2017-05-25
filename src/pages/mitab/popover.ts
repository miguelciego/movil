import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';

import { AfiliadoStorage } from '../../providers/afiliado-storage';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
        
@Component({
  templateUrl: 'popover.html'
})
export class PopoverPage {
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public AfiliadoStorage: AfiliadoStorage,
    public storage:Storage,
    private alertCtrl: AlertController
  //public MyApp: MyApp
  ){
  }
  close() {
    this.storage.clear();
    this.viewCtrl.dismiss();
    this.presentConfirm();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Advertencia!',
      message: '¿ Está usted seguro de desvincularse ?',
      buttons: [
        {
          text: 'No',
          role: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.navCtrl.push(LoginPage);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}