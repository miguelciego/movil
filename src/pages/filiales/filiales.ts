import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';
import { errorServe } from '../error/error'

@IonicPage()
@Component({
  selector: 'page-filiales',
  templateUrl: 'filiales.html',
  providers: [CpsProviders, errorServe]
})
export class FilialesPage {

  private FilialesEncontradas: any[] = [];
  private Especialidades: any[] = [];
  private elength;
  private Paciente;
  private Ficha;
  private validarN;
  private validarB;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private cps: CpsProviders,
    private LoadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private eServe: errorServe
  ) {
    this.Ficha = navParams.get('Ficha');
    this.Paciente = navParams.get('Paciente');
    this.FilialesEncontradas = navParams.get('Filiales');
    this.validarN = navParams.get('cod');
    this.validarB = navParams.get('msj')
    console.log("el resultado de n es", this.validarN)

    this.Ficha.PacienteCodigo = this.Paciente.Codigo;
    this.Ficha.PacienteMatricula = this.Paciente.Matricula;
    this.Ficha.PacienteNombre = this.Paciente.Nombre;
    this.Ficha.PacienteTAsegurado = this.Paciente.TAsegurado;
    this.Ficha.PacienteHClinica = this.Paciente.HClinica;
    this.Ficha.PacienteAtendido = this.Paciente.Atendido;
    this.Ficha.PacienteFicha = this.Paciente.Ficha;
  }

  ionViewDidLoad() {
  }
  iraEspecialidades(Filial) {
    //this.navCtrl.push('EspecialidadesPage', { Ficha: this.Ficha, Filial: Filial });
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.cps.getEspecialidades(this.Ficha.dpts, Filial.Codigo, Filial.Fecha)
      .subscribe(data => {
        this.Especialidades = data.json();
        this.elength = this.Especialidades.length;
        this.navCtrl.push('EspecialidadesPage', {
          Filial:Filial,
          Especialidades: this.Especialidades,
          Ficha: this.Ficha,
          length: this.elength,
        });

      },
      err => {
        if (err.status == 404) {
        } else {
          console.log(err.status);
          this.AlertError();
        }
      },
      () => console.log("Completado : especialidadPage")
      );
  }

  volver() {
    this.navCtrl.pop();
  }
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message:'...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [
        {
          text: 'Listo',
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
      message: 'Problema de conexión.',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}
