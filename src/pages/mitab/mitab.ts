import { Component } from '@angular/core';
import { NavParams, PopoverController, ToastController } from 'ionic-angular';

import { MapasPage } from '../mapas/mapas';
import { HomePage } from '../home/home';
import { ConfigPage } from '../config/config';
import { GrupoFamiliarPage } from '../grupofamiliar/grupofamiliar';

@Component({
  selector: 'page-mitab',
  templateUrl: 'mitab.html'
})
export class MitabPage {
  public login:any[]=[];
  public contador:number;
  tab1Root: any = HomePage;
  tab2Root: any = GrupoFamiliarPage;
  tab3Root: any = MapasPage;
  tab4Root: any = ConfigPage;

  constructor(
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {
   // this.presentToast();
    console.log("datos del login",this.getLogin());
    this.contador = 3;
  }
  getLogin(){
    this.login = this.navParams.get('login');
    if(this.login != undefined) {
      return this.login;
    }
  }
  /*presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Successful',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }*/
}