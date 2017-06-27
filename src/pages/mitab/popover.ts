import { Component } from '@angular/core';
import { NavController, App, ViewController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AfiliadoStorage } from '../../providers/afiliado-storage';

@Component({
  templateUrl: 'popover.html'
})
export class PopoverPage {
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public AfiliadoStorage: AfiliadoStorage,
    public storage: Storage,
    private alertCtrl: AlertController,
    public appCtrl: App
  ) {
  }
  close() {
    this.viewCtrl.dismiss();
    this.presentConfirm();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Desvincular',
      message: 'Al desvincularse estaría cerrando la sesion de su grupo familiar ¿ Está usted seguro ?',
      cssClass: 'my-alert',
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
            this.storage.clear();
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
            console.log('se ha desvinculado correctamente');
          }
        }
      ]
    });
    alert.present();
  }
}