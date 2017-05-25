import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  public login:any[]=[];

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
   public popoverCtrl: PopoverController,
  public alertCtrl: AlertController,
  ){
    this.login = navParams.data;
    console.log(this.login);
  }
  ionViewDidLoad() {}
   presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}
