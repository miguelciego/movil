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

  private Filial;
  private Especialidades;
  private Ficha;
  private rlength;
  private elength;
  private Medico;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private cps: CpsProviders,
    private LoadCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.Ficha = navParams.get('Ficha');
    this.Especialidades = navParams.get('Especialidades');
    this.rlength = navParams.get('length');
    this.Filial = navParams.get('Filial');
    this.Ficha.FilialCodigo = this.Filial.Codigo;
    this.Ficha.FilialDescripcion = this.Filial.Nombre;
    this.Ficha.Fecha = this.Filial.Fecha;
  }
  ionViewDidLoad() { }
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
    this.query = this.cps.getMedicos(
      this.Ficha.dpts,
      this.Ficha.FilialCodigo,
      Especialidad.Valor,
      this.Ficha.Fecha
    )
      .subscribe(data => {
        this.Medico = data.json();
        this.elength = this.Medico.length;
        this.navCtrl.push('MedicosPage', {
          Especialidad: Especialidad,
          Medico: this.Medico,
          Ficha: this.Ficha,
          length: this.elength
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
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}
