import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-medicos',
  templateUrl: 'medicos.html',
  providers: [CpsProviders]

})
export class MedicosPage {

  query: Subscription;

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
    private toastCtrl: ToastController
  ) {
    this.Especialidad = navParams.get('Especialidad');
    this.Ficha = navParams.get('Ficha');
    this.Medico = navParams.get('Medico');
    this.rlength = navParams.get('length');

    this.Ficha.EspecialidadCodigo = this.Especialidad.Valor;
    this.Ficha.EspecialidadDescripcion = this.Especialidad.Descripcion;
  }
  ionViewDidLoad() {}
  ionViewWillLeave(){
    this.query.unsubscribe();
    console.log("paso por ionViewWillLeave MEDICO")
  }
  iraHorarios(Medico) {
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.query = this.cps.getHorarios(this.Ficha.dpts, this.Ficha.FilialCodigo, this.Ficha.EspecialidadCodigo, Medico.Valor, this.Ficha.Fecha)
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
        load.dismiss();
        console.log(err.status);
        this.ToastError();
      },
      () => console.log('Completado : horarioPage')
      )
  }
  volver() {
    this.navCtrl.pop();
  }
  ToastError() {
    let toast = this.toastCtrl.create({
      message: 'Se ha producido un error. Inténtalo de nuevo',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}
