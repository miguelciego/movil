import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public alertCtrl: AlertController
  ){}
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
             console.log('Salir');
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
