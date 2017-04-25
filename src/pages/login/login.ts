import { Component } from '@angular/core';
import { NavController,Nav, NavParams } from 'ionic-angular';
import { MitabPage } from '../mitab/mitab';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public navParams: NavParams) {
    
  }
  Verificar(){
    this.nav.setRoot(MitabPage);
  }
}
