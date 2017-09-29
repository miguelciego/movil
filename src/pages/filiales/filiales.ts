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
  cancel: boolean = false;
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
    if (this.FilialesEncontradas.length == 0) {
      this.validarN = 3;
    }
    this.validarB = navParams.get('msj')
    this.Ficha.PacienteCodigo = this.Paciente.Codigo;
    this.Ficha.PacienteMatricula = this.Paciente.Matricula;
    this.Ficha.PacienteNombre = this.Paciente.Nombre;
    this.Ficha.PacienteTAsegurado = this.Paciente.TAsegurado;
    this.Ficha.PacienteHClinica = this.Paciente.HClinica;
    this.Ficha.PacienteAtendido = this.Paciente.Atendido;
    this.Ficha.PacienteFicha = this.Paciente.Ficha;
    console.log("Paciente =>", this.Paciente.Matricula,"N =>", this.validarN)
    console.log("filialesEncontradas", this.FilialesEncontradas)
  }
  ionViewDidLoad() {
    
  }
  ionViewWillLeave() {
    if (this.cancel == true) { this.query.unsubscribe(); }
  }
  iraEspecialidades(Filial) {
    this.cancel = true;
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.query = this.cps.getTeste(this.Ficha.dpts, Filial.Codigo)
      .subscribe(data => {
        this.Especialidades = data.json();
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
      () => console.log("especialidadPage => Completado")
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
