import { Component } from '@angular/core';
import { IonicPage, NavParams, PopoverController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mitab',
  templateUrl: 'mitab.html'
})
export class MitabPage {
  public login:any[]=[];
  public contador:number;
  tab1Root: any = 'HomePage';
  tab2Root: any = 'GrupoFamiliarPage';
  tab3Root: any = 'MapasPage';

  constructor(
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    console.log("datos del login",this.getLogin());
    this.contador = 2;
  }
  getLogin(){
    this.login = this.navParams.get('login');
    if(this.login != undefined) {
      return this.login;
    }
  }
}