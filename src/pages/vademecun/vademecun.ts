import { Component } from '@angular/core';
import { NavController,Nav, NavParams } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';

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
    private cps: CpsProviders) 
    {
      this.getRecetas();
  }
 
 getRecetas(){
   this.Recetaslist = this.cps.getRecetas1();
   console.log(this.Recetaslist);
 }
}

