import { Component } from '@angular/core';
import { AlertController, App, NavController, ViewController } from 'ionic-angular';
import { gFamiliarStorage } from '../../providers/grupoFamiliar-storage';
import { Storage } from '@ionic/storage';
import { AfiliadoStorage } from '../../providers/afiliado-storage';

@Component({
  templateUrl: 'popoverUpdate.html'
})
export class popoverUpdatePage {

  public msj;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public AfiliadoStorage: AfiliadoStorage,
    public storage: Storage,
    private alertCtrl: AlertController,
    public appCtrl: App,
    private gStorage: gFamiliarStorage,
  ) {
  }
  update(){
    this.viewCtrl.dismiss();
    this.gStorage.create(null) 
    .then (data => {
      console.log("Agregado null en el objeto de grupo familiar")
    })
    .catch(error => {
      console.log("Error en popoverUpdate:Update()")
    }),
    this.appCtrl.getRootNav().setRoot('MitabPage');
  }
  close() {
    this.viewCtrl.dismiss();
    this.presentConfirm();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Advertencia!',
      message: 'Al desvincularse estaría cerrando sesión de su grupo familiar. ¿Está usted seguro?',
      cssClass: 'my-alert',
      buttons: [
        {
          text: 'No',
          role: 'No',
          handler: () => {
            console.log('Cancel NO');
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
                  this.appCtrl.getRootNav().setRoot('VerificacionPage');
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