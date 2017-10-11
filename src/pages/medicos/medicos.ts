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
  cancel: boolean = false;

  private Medico;
  private Horario;
  private Ficha;
  private length;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private cps: CpsProviders,
    private LoadCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.Ficha = navParams.get('Ficha');
    this.Medico = navParams.get('Medico');
    this.length = this.Medico.length;
  }
  ionViewWillLeave() {
    if (this.cancel == true) { this.query.unsubscribe(); }
  }

  iraHorarios(Medico) {
    this.cancel = true;
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.Ficha.MedicoCodigo = Medico.Valor;
    this.Ficha.MedicoNombre = Medico.Descripcion;

    this.query = this.cps.getHorarios(this.Ficha.dpts,
      this.Ficha.FilialCodigo,
      this.Ficha.EspecialidadCodigo,
      this.Ficha.MedicoCodigo,
      this.Ficha.Fecha)
      .subscribe(data => {
        this.Horario = data.json();
        this.navCtrl.push('HorariosPage', {
          Horario: this.Horario,
          Ficha: this.Ficha
        });
        this.navCtrl.remove(3);
        console.log("medico", this.Horario)
      },
      err => {
        load.dismiss();
        console.log(err.status);
        this.ToastError();
      },
      () => console.log('horarioPage => Completado')
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
