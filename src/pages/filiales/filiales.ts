import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-filiales',
  templateUrl: 'filiales.html',
  providers: [CpsProviders]
})
export class FilialesPage {

  query: Subscription;

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
    private toastCtrl: ToastController

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

    console.log(this.Ficha);
  }
  ionViewDidLoad() {
  }
  ionViewWillLeave(){
    this.query.unsubscribe();
    console.log("paso por ionViewWillLeave FILIAL")
  }
  iraEspecialidades(Filial) {
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.query = this.cps.getEspecialidades(this.Ficha.dpts, Filial.Codigo, Filial.Fecha)
      .subscribe(data => {
        this.Especialidades = data.json();
        console.log("Especialidades", this.Especialidades)
        this.elength = this.Especialidades.length;
        this.navCtrl.push('EspecialidadesPage', {
          Filial: Filial,
          Especialidades: this.Especialidades,
          Ficha: this.Ficha,
          length: this.elength,
        });
      },
      err => {
        load.dismiss()
        console.log(err.status)
        this.ToastError()
      },
      () => console.log("Completado : especialidadPage")
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
