import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-permiso',
  templateUrl: 'permiso.html',
  providers: [CpsProviders]
})
export class PermisoPage {

  private permiso;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cps: CpsProviders,
    private LoadCtrl:LoadingController
  ){

  }

  ionViewDidLoad() {
    let load = this.LoadCtrl.create({
      content: 'Buscando...',
    });
    load.present();
    this.cps.getPermiso()
      .subscribe(data => {
        this.permiso = data.json();
        load.dismiss();
        console.log("lista de permiso", this.permiso)
      },
      err => {
        console.log(err.status);
      },
      () => console.log('getmaps -> completado')
      );
  }

}
