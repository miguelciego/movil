import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
  providers: [CpsProviders]
})
export class Historial {

  public codigo;
  public historial;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cps: CpsProviders,
    private toastCtrl:ToastController,
    public LoadCtrl: LoadingController
  ) {
    this.codigo = navParams.get('Codigo');
    console.log("codigo es ", this.codigo)
  }

  ionViewDidLoad() {
    let load = this.LoadCtrl.create({
      content: 'Cargando...'
    });
    this.cps.getHistorial(this.codigo)
    .subscribe(data => { 
        this.historial = data.json();
        console.log("Historial",this.historial);
        this.presentToast(this.historial.length)
         load.dismiss();
        },
      err => { if (err.status == 404) {
        } else {
            console.log(err.status);
             load.dismiss();
          }
          
        },
      () =>  load.dismiss()
    ); 
  }
  presentToast(lenght) {
    let toast = this.toastCtrl.create({
      message: lenght + ' Resultados.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
