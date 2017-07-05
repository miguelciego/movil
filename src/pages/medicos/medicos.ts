import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { DetalleMedPage } from '../detalle-med/detalle-med';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-medicos',
  templateUrl: 'medicos.html',
  providers: [CpsProviders]

})
export class MedicosPage {
  private Medicos;
  private Especialidad;
  private Ficha;
  private length;

  constructor(
  private navCtrl: NavController, 
  private navParams: NavParams, 
  private cps: CpsProviders,
  private LoadCtrl: LoadingController,
  private alertCtrl: AlertController,
  private toastCtrl:ToastController
  ){
    this.Especialidad = navParams.get('Especialidad');
    this.Ficha = navParams.get('Ficha');
      
    this.Ficha.EspecialidadCodigo = this.Especialidad.Valor;
    this.Ficha.EspecialidadDescripcion = this.Especialidad.Descripcion;
  }
  ionViewDidLoad(){
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();

    this.cps.getMedicos(
      this.Ficha.dpts,
      this.Ficha.FilialCodigo,
      this.Ficha.EspecialidadCodigo,
      this.Ficha.Fecha
    )
    .subscribe(data => { 
        this.Medicos = data.json();
        this.length = this.Medicos.length;
        },
      err => { if (err.status == 404) {
        } else {
            console.log(err.status);
            this.AlertError();
          }
        },
      () => console.log("Completado : medicoPage")
    );
  }
  iraHorarios(Medico) {
    this.navCtrl.push('HorariosPage', { Medico: Medico, Ficha: this.Ficha });
  }
  irDetalleMed(Medico){
     this.navCtrl.push(DetalleMedPage, { Medico: Medico});
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
      message: 'Problemas de Servidor',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}
