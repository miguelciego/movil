import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
  providers: [CpsProviders]
})
export class ModalPage {
  public getficha;
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public viewCtrl: ViewController,
  private cps: CpsProviders) {
        console.log(this.getficha);
        this.Mostrarficha();
  }
   Mostrarficha(){
    this.getficha = this.cps.getMFicha1();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
