import { Component } from '@angular/core';
import { NavController,Nav, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-vademecun',
  templateUrl: 'Vademecun.html'
})
export class VademecunPage {

  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public navParams: NavParams) {
    
  }
}
