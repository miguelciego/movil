import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, App, AlertController } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
  providers: [CpsProviders]
})
export class ResumenPage {

  public Ficha;
  public getHora;
  public NombrePaciente;
  public Matricula;
  public Filial;
  public Especialidad;
  public Medico;
  public Hora;
  public Dia;

  private datos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cps: CpsProviders,
    public LoadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public appCtrl: App,
    public alertCtrl:AlertController
  ){
    this.getHora = navParams.get('Hora');
    this.Ficha = navParams.get('Ficha');
    this.Ficha.valorh = this.getHora.Valor;
    this.Ficha.horaD = this.getHora.Descripcion;
    this.NombrePaciente = this.Ficha.PacienteNombre;
    this.Matricula = this.Ficha.PacienteMatricula;
    this.Filial= this.Ficha.FilialDescripcion;
    this.Especialidad = this.Ficha.EspecialidadDescripcion;
    this.Medico = this.Ficha.MedicoNombre;
    this.Hora = this.Ficha.horaD;
    this.Dia = this.Ficha.Fecha;
    console.log(this.Ficha);
  }

  Guardar(){
    let load = this.LoadCtrl.create({
      content: 'Guardando Ficha...'
    });
    load.present();

    this.cps.putGFicha(
      this.Ficha.dpts,
      this.Ficha.PacienteCodigo,
      this.Ficha.FilialCodigo,
      this.Ficha.EspecialidadCodigo,
      this.Ficha.MedicoCodigo,
      this.Ficha.valorh,
      this.Ficha.Fecha
    )
    .subscribe( data => { 
      this.datos = data.json();
        switch (this.datos.Codigo) {
          case "G0":
              console.log("codigo", this.datos.Codigo)
              load.dismiss();
              this.ToastG0(this.datos.Descripcion);
              this.navCtrl.popToRoot();
            break;
          case "E1":
              console.log("codigo", this.datos.Codigo)
              load.dismiss();
              this.ToastE1(this.datos.Descripcion);
              this.navCtrl.popToRoot();
            break;
          case "E2":
              console.log("codigo", this.datos.Codigo)
              load.dismiss();
              this.ToastE2(this.Ficha.horaD);
              this.navCtrl.remove(4)
              this.navCtrl.pop()
            break;
        }
      },
      err => { if (err.status == 404) {
        } else {
            console.log(err.status);
            load.dismiss();
            this.AlertError();
          }
        },
      () => console.log('putGFicha -> completado')
    );
  }
  cancelar(){
    this.navCtrl.pop();
  }
  ToastG0(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }
  ToastE1(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  ToastE2(horario) {
    let toast = this.toastCtrl.create({
      message: 'El horario ' + horario + ' acaba de ocupar.',
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [
        {
          text: 'Bueno',
          handler: () => {
            this.ToastAlertError();
            this.navCtrl.popToRoot()
          }
        }
      ]
    });
    alert.present();
  }
  ToastAlertError() {
    let toast = this.toastCtrl.create({
      message: 'Problemas del Servidor, Vuelve a intentarlo más tarde.',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}