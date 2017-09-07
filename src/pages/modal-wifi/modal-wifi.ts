import { Component } from '@angular/core';
import { IonicPage,  NavParams, ViewController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-modal-wifi',
  templateUrl: 'modal-wifi.html',
  providers: [Network]
})
export class ModalWifi {

  private img;
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
      this.img = navParams.get('img');
    }
  ionViewDidLoad(){
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
