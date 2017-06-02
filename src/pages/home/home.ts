import { Component } from '@angular/core';
import { NavController, Platform, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';
import { Storage } from '@ionic/storage';

import { AfiliadoStorage } from '../../providers/afiliado-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Afiliado:any [] = [];
  public txtmatricula : any;
  public txtfilial : any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public AfiliadoStorage : AfiliadoStorage,
    protected platform : Platform,
    public  storage:Storage
  ) {}
  ionViewDidLoad() {
    this.getAfiliado();
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  private getAfiliado(){
    this.AfiliadoStorage.getAll()
    .then((data: any[]) =>{
      this.Afiliado = data;
      Object.keys(this.Afiliado).forEach( key => {
          console.log(this.Afiliado[key].filial);
      });
    })
    .catch(error =>{
      console.log(error)
    })
  }
}