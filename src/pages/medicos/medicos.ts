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
  private Medico;
  private Especialidad;
  private Horario;
  private Ficha;
  private rlength;
  private elength;

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
    this.Medico = navParams.get('Medico'); 
    this.rlength = navParams.get('length'); 

    this.Ficha.EspecialidadCodigo = this.Especialidad.Valor;
    this.Ficha.EspecialidadDescripcion = this.Especialidad.Descripcion;
    console.log(this.Ficha); 

  }
  ionViewDidLoad(){
    /*let load = this.LoadCtrl.create({
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
    );*/
  }
  iraHorarios(Medico) {
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.cps.getHorarios(this.Ficha.dpts, this.Ficha.FilialCodigo, this.Ficha.EspecialidadCodigo, Medico.Valor, this.Ficha.Fecha)
      .subscribe(data => {
        this.Horario = data.json();
        this.elength = this.Horario.length;
        this.navCtrl.push('HorariosPage', { 
          Medico: Medico, 
          Horario: this.Horario,
          Ficha: this.Ficha,
          length: this.elength
        });
      },
      err => {
        if (err.status == 404) {
        } else {
          console.log(err.status);
          this.AlertError();
        }
      },
      () => console.log('Completado : horarioPage')
      );
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
          text: 'OK',
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
