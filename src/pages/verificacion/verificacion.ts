import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';

import { AfiliadoStorage } from '../../providers/afiliado-storage';

@IonicPage()
@Component({
  selector: 'page-verificacion',
  templateUrl: 'verificacion.html',
  providers: [AfiliadoStorage]
})
export class VerificacionPage {

  constructor(
    public AfiliadoStorage: AfiliadoStorage,
    public appCtrl: App
  ) { }

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
}
