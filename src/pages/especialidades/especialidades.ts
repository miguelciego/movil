import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Content } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-especialidades',
  templateUrl: 'especialidades.html',
  providers: [CpsProviders]
})
export class EspecialidadesPage {
  @ViewChild(Content) content: Content;

  query: Subscription;
  cancel: boolean = false;

  private Especialidades = [];
  private Ficha;
  private length;
  private Medico = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private cps: CpsProviders,
    private LoadCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.Ficha = navParams.get('Ficha');
    this.Especialidades = navParams.get('Especialidades');
    this.length = this.Especialidades.length;
  }
  ionViewWillLeave() {
    if (this.cancel == true) { this.query.unsubscribe(); }
  }

  iraMedicos(Especialidad) {
    this.cancel = true;
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.Ficha.EspecialidadCodigo = Especialidad.Valor;
    this.Ficha.EspecialidadDescripcion = Especialidad.Descripcion;

    this.query = this.cps.getMedicos(
      this.Ficha.dpts,
      this.Ficha.FilialCodigo,
      this.Ficha.EspecialidadCodigo,
      this.Ficha.Fecha
    )
      .subscribe(data => {
        this.Medico = data.json();
        this.navCtrl.push('MedicosPage', {
          Medico: this.Medico,
          Ficha: this.Ficha
        });
      },
      err => {
        load.dismiss();
        console.log(err.status);
        this.ToastError();
      },
      () => console.log("MedicoPage => Completado")
      )
  }

  volver() {
    this.navCtrl.pop();
  }

  ToastError() {
    let toast = this.toastCtrl.create({
      message: 'Se ha producido un error. Inténtalo de nuevo',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }
}
