import { Component } from '@angular/core';
import { Device } from 'ionic-native';
import { Platform, NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Centros page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-centros',
  templateUrl: 'centros.html'
})
export class CentrosPage {
  public device;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              platform: Platform ) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CentrosPage');
    
  }



}
