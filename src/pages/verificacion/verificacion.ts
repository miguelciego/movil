import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, App } from 'ionic-angular';

import { AfiliadoStorage } from '../../providers/afiliado-storage';

@IonicPage()
@Component({
  selector: 'page-verificacion',
  templateUrl: 'verificacion.html',
  providers: [AfiliadoStorage]
})
export class VerificacionPage {

  constructor(
    public LoadCtrl:LoadingController,
    public AfiliadoStorage:AfiliadoStorage,
    public navCtrl: NavController,
    public appCtrl: App
  ) {}

  ionViewDidLoad() {
    this.Session();
  }
  public Session(){

    this.AfiliadoStorage.getAll()
    .then((afiliado: any[]) =>{
      console.log('data', afiliado);
      if(afiliado == null){
        console.log("app.component, datos de storage ->",afiliado)
        this.appCtrl.getRootNav().setRoot('LoginPage');
      }else{
        this.appCtrl.getRootNav().setRoot('MitabPage');
      }
    })
    .catch(error =>{
      console.log("Error al iniciar")
    })
  }
}
