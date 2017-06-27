import { Component } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Afiliado: any[] = [];
  public txtmatricula: any;
  public txtfilial: any;
  isAndroid: boolean = true;

  constructor(
    public popoverCtrl: PopoverController,
  ) {}
  ionViewDidLoad() {}
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}