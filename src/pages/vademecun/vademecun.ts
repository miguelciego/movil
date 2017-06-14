import { Component } from '@angular/core';
import { IonicPage, NavController,Nav, NavParams,LoadingController } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-vademecun',
  templateUrl: 'Vademecun.html',
  providers: [CpsProviders]
})
export class VademecunPage {

  public Recetaslist;
  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public navParams: NavParams,
    private cps: CpsProviders,
    public LoadCtrl: LoadingController
  ){}
  ionViewDidLoad() {
    let load = this.LoadCtrl.create();
    load.present();
    this.getRecetas()
    load.dismiss();
  }
  getRecetas(){
    this.Recetaslist = this.cps.getRecetas1();
    console.log(this.Recetaslist);
  }
}

