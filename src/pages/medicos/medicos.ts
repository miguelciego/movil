import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DetalleMedPage } from '../detalle-med/detalle-med';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-medicos',
  templateUrl: 'medicos.html',
  providers: [CpsProviders]

})
export class MedicosPage {
  public Medicos;
  public Especialidad;
  public Ficha;
  public length;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private cps: CpsProviders,
  public LoadCtrl: LoadingController,
  private alertCtrl: AlertController
  ){
    this.Especialidad = navParams.get('Especialidad');
    this.Ficha = navParams.get('Ficha');
      
    this.Ficha.EspecialidadCodigo = this.Especialidad.Valor;
    this.Ficha.EspecialidadDescripcion = this.Especialidad.Descripcion;
    this.listMedicos();
  }
  listMedicos(){
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      duration: 5000
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
            load.dismiss();
            this.AlertError();
          }
        },
      () => load.dismiss()
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
      title: 'Lo sentimos ...',
      subTitle: '..Pero en entos momentos no podemos responder a tu solicitud.',
      buttons: ['Ok']
    });
    alert.present();
  }
}
