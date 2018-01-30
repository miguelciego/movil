import { Component } from '@angular/core';
import { IonicPage, PopoverController, NavController } from 'ionic-angular';

import { PopoverPage } from '../mitab/popover';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CpsProviders]
})
export class HomePage {
  Afiliado: any[] = [];
  public txtmatricula: any;
  public txtfilial: any;
  isAndroid: boolean = true;

  constructor(
    public popoverCtrl: PopoverController,
    private cps: CpsProviders,
    private navCtrl: NavController,
    
  ) {
  }
  ionViewDidLoad() {
  }
  IrPermiso() {
    this.navCtrl.push('PermisoPage')
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}