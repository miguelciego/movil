import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavController} from 'ionic-angular';

@Component({
  templateUrl: 'popover.html'
})
export class PopoverPage {
  constructor(
  public viewCtrl: ViewController,
  public navCtrl: NavController,
  ){
  }
  close() {
    this.viewCtrl.dismiss();
  }
}