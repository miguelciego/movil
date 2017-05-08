import { Component } from '@angular/core';
import { NavController,Nav, NavParams } from 'ionic-angular';
import { MitabPage } from '../mitab/mitab';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login={};
  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }
  logForm() {
      console.log(this.login)
      this.nav.setRoot(MitabPage,{ login: this.login });
  }
  Verificar(){
    this.nav.setRoot(MitabPage);
  }
}
