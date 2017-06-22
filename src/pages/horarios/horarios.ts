import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-horarios',
  templateUrl: 'horarios.html',
  providers: [CpsProviders]

})
export class HorariosPage {

  public Medico;
  public Horarios;
  public Ficha;
  public length;

  constructor(public navCtrl: NavController,
  public navParams: NavParams, 
  private cps: CpsProviders,
  public LoadCtrl: LoadingController,
  public alertCtrl:AlertController,
  public toastCtrl:ToastController
  ) {
    this.Medico = navParams.get('Medico');
    this.Ficha = navParams.get('Ficha');

    this.Ficha.MedicoCodigo = this.Medico.Valor;
    this.Ficha.MedicoNombre = this.Medico.Descripcion;
  }
  ionViewDidLoad(){
    let load = this.LoadCtrl.create({
      content: 'Cargando...'
    });
    load.present();
      this.cps.getHorarios(this.Ficha.dpts,this.Ficha.FilialCodigo,this.Ficha.EspecialidadCodigo,this.Ficha.MedicoCodigo,this.Ficha.Fecha)
        .subscribe(data => { 
          this.Horarios = data.json();
          this.length = this.Horarios.length;
          load.dismiss(); 
        },
      err => { if (err.status == 404) {
        } else {
            console.log(err.status);
            load.dismiss();
            this.AlertError();
          }
        },
      () => console.log('getHorarios -> completado')
    );
  }
  irResumen(Hora) {
    this.navCtrl.push('ResumenPage',{ Hora : Hora, Ficha: this.Ficha }); 
  }
   volver(){
    this.navCtrl.pop();
  }
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [
        {
          text: 'Bueno',
          handler: () => {
            this.navCtrl.popToRoot()
            this.ToastAlertError();
          }
        }
      ]
    });
    alert.present();
  }
  ToastAlertError() {
    let toast = this.toastCtrl.create({
      message: 'Problemas del Servidor, Vuelve a intentarlo más tarde.',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}
