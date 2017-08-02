import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-permiso',
  templateUrl: 'permiso.html',

})
export class PermisoPage {

  private permiso;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.permiso = this.navParams.get('permisos')
  }
}
