import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { CentrosPage } from '../centros/centros';
import { MapasPage } from '../mapas/mapas';
import { HomePage } from '../home/home';
import { ConfigPage } from '../config/config';
import { GrupoFamiliarPage } from '../grupofamiliar/grupofamiliar';
import { PopoverController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-mitab',
  templateUrl: 'mitab.html'
})
export class MitabPage {
  public login:any[]=[];

  tab1Root: any = HomePage;
  tab2Root: any = GrupoFamiliarPage;
  tab3Root: any = CentrosPage;
  tab4Root: any = MapasPage;
  tab5Root: any = ConfigPage;

  constructor(
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    
    this.presentToast();
    console.log("datos del login",this.getLogin());
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Successful',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  getLogin(){
    this.login = this.navParams.get('login');
    if(this.login != undefined) {
      return this.login;
    }
  }
}