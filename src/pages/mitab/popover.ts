import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { LoginPage } from '../login/login'

@Component({
  templateUrl: 'popover.html'
})
export class PopoverPage {
  constructor(
  public viewCtrl: ViewController,
  public navCtrl: NavController
  ){

  }
  close() {
    this.viewCtrl.dismiss();
   // this.navCtrl.setRoot( LoginPage );
  }
}