import { Component } from '@angular/core';
import { IonicPage,  NavParams, ViewController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-modal-wifi',
  templateUrl: 'modal-wifi.html',
  providers: [Network]
})
export class ModalWifi {

  private data = [];
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private sanitizer: DomSanitizer,
    ) {
      this.data = navParams.get('data');
      console.log("data", this.data)
    }
  ionViewDidLoad(){
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
