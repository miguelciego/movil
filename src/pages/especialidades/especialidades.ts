import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Content } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-especialidades',
  templateUrl: 'especialidades.html',
  providers: [CpsProviders]
})
export class EspecialidadesPage {

  @ViewChild(Content) content: Content;
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
    private alertCtrl: AlertController,
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
  ionViewDidLoad() {
    /*let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.cps.getEspecialidades(this.Ficha.dpts, this.Filial.Codigo, this.Filial.Fecha)
      .subscribe(data => {
        this.Especialidades = data.json();
        this.length = this.Especialidades.length;
      },
      err => {
        if (err.status == 404) {
        } else {
          console.log(err.status);
          this.AlertError();
        }
      },
      () => console.log("Completado : especialidadPage")
      );*/
  }
  iraMedicos(Especialidad) {
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.cps.getMedicos(
      this.Ficha.dpts,
      this.Ficha.FilialCodigo,
      Especialidad.Valor,
      this.Ficha.Fecha
    )
      .subscribe(data => {
        this.Medico = data.json();
        console.log("result",this.Medico)
        this.elength = this.Medico.length;
        this.navCtrl.push('MedicosPage', {
          Especialidad: Especialidad,
          Medico: this.Medico,
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
      () => console.log("Completado : medicoPage")
      );
  }
  volver() {
    this.navCtrl.pop();
  }
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [
        {
          text: 'Ok',
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
      message: 'Problemas del Servidor',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}
