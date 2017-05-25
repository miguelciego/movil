import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';
import { CpsProviders } from '../../providers/cps';

@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
  providers: [CpsProviders]
})
export class MapasPage {

  public Maps;

  constructor(
    public cps: CpsProviders,
    public popoverCtrl: PopoverController,
  ){
    this.AllMaps();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapasPage');
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  AllMaps(){
    this.Maps =  this.cps.getFiliales1();
  }
}
