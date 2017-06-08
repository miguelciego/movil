import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { AfiliadoStorage } from '../../providers/afiliado-storage';

import { MitabPage } from '../mitab/mitab';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-verificacion',
  templateUrl: 'verificacion.html'
})
export class VerificacionPage {

  constructor(
    public LoadCtrl:LoadingController,
    public AfiliadoStorage:AfiliadoStorage,
    public navCtrl: NavController, 
  ) {}

  ionViewDidLoad() {
    this.Session();
  }
  public Session(){
    let load = this.LoadCtrl.create({
      content: 'Loading...'
    });
    load.present();
     console.log("Error al iniciar1123")
    this.AfiliadoStorage.getAll()
    .then((afiliado: any[]) =>{
      console.log('data', afiliado);
      if(afiliado == null){
        console.log("app.component, datos de storage ->",afiliado)
        load.dismiss();
        this.navCtrl.setRoot(LoginPage);
      }else{
        load.dismiss();
        this.navCtrl.setRoot(MitabPage);
      }
    })
    .catch(error =>{
      console.log("Error al iniciar")
    })
  }
}
