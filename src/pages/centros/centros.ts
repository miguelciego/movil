import { Component } from '@angular/core';
import { Device } from 'ionic-native';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';

@Component({
  selector: 'page-centros',
  templateUrl: 'centros.html'
})
export class CentrosPage {
  public device;

  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   public popoverCtrl: PopoverController,
   platform: Platform 
   ) {
    this.device = {};
        platform.ready().then(() => {
            this.device['uuid'] = Device.uuid;
            this.device['platform'] = Device.platform;
            this.device['manufacturer'] = Device.manufacturer;
            this.device['version'] = Device.version;
            this.device['serial'] = Device.serial;
            this.device['model'] = Device.model;
        });
  }
  presentPopover(myEvent) {
    
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CentrosPage');
    
  }



}
