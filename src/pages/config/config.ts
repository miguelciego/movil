import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login'; 

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public alertCtrl: AlertController
  ){

  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Desvincular',
      message: "Al devincularse cerrara sesion con el grupo familiar iniciado ¿ Está seguro ?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: data => {
             this.navCtrl.setRoot(LoginPage)
          }
        }
      ]
    });
    prompt.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }
}
