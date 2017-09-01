import { Component } from '@angular/core';
import { IonicPage, PopoverController, NavController, LoadingController, ToastController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CpsProviders]
})
export class HomePage {
  private permiso;
  Afiliado: any[] = [];
  public txtmatricula: any;
  public txtfilial: any;
  isAndroid: boolean = true;

  constructor(
    public popoverCtrl: PopoverController,
    private cps: CpsProviders,
    private navCtrl: NavController,
    private LoadCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
  }
  ionViewDidLoad() {
  }
  IrPermiso() {
    let load = this.LoadCtrl.create({
      content: 'Médicos con permisos...',
      dismissOnPageChange: true
    });
    load.present()
    this.cps.getPermiso()
      .subscribe(data => {
        this.permiso = data.json();
        this.navCtrl.push('PermisoPage', {
          permisos: this.permiso
        })
      },
      err => {
        console.log(err.status)
        this.dataError()
        load.dismiss()
      },
      () => console.log('getmaps -> completado')
      );
  }
  dataError() {
    let toast = this.toastCtrl.create({
      message: 'Se ha producido un error al buscar los médicos con permiso. Intentalo de nuevo',
      position: 'middle',
      duration: 4000
    });
    toast.present();
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}