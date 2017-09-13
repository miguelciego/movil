import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, App, AlertController, ViewController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
  providers: [CpsProviders, LocalNotifications]
})
export class ResumenPage {

  private Ficha;
  private getHora;
  private NombrePaciente;
  private Matricula;
  private Filial;
  private Especialidad;
  private Medico;
  private Hora;
  private Dia;
  private datos;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private cps: CpsProviders,
    private LoadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private appCtrl: App,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications,
    public viewCtrl: ViewController
  ) {
    this.getHora = navParams.get('Hora');
    this.Ficha = navParams.get('Ficha');
    this.Ficha.valorh = this.getHora.Valor;
    this.Ficha.horaD = this.getHora.Descripcion;
    this.NombrePaciente = this.Ficha.PacienteNombre;
    this.Matricula = this.Ficha.PacienteMatricula;
    this.Filial = this.Ficha.FilialDescripcion;
    this.Especialidad = this.Ficha.EspecialidadDescripcion;
    this.Medico = this.Ficha.MedicoNombre;
    this.Hora = this.Ficha.horaD;
    this.Dia = this.Ficha.Fecha;
    console.log("Ficha",this.Ficha);
  }
  Guardar() {
    let load = this.LoadCtrl.create({
      content: 'Guardando Ficha...',
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
      .subscribe(data => {
        this.datos = data.json();
        switch (this.datos.Codigo) {
          case "G0": //GUARDAR FICHA
            console.log("codigo", this.datos.Codigo)
            load.dismiss();
            this.ToastG0(this.datos.Descripcion);
            this.navCtrl.popToRoot();
            this.notificacionFicha(this.NombrePaciente, this.Matricula)
            break;
          case "E1": //YA CUENTA CON FICHA
            console.log("codigo", this.datos.Codigo)
            load.dismiss();
            this.ToastE1(this.datos.Descripcion);
            this.navCtrl.popToRoot();
            break;
          case "E2": //EL HORARIO SE ACABA DE OCUPAR
            console.log("codigo", this.datos.Codigo)
            load.dismiss();
            this.ToastE2(this.Ficha.horaD);
            this.navCtrl.remove(4)
            this.navCtrl.pop()
            break;
        }
      },
      err => {
        console.log(err.status);
        load.dismiss();
        this.ToastError();
      },
      () => console.log('Completado : resumenPage')
      );
  }
  cancelar() {
    this.navCtrl.pop()
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
      duration: 4000,
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

  ToastError() {
    let toast = this.toastCtrl.create({
      message: 'Se ha producido un error al guardar la ficha. Inténtalo de nuevo.',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
  notificacionFicha(afiliado, matricula) {
    this.localNotifications.schedule({
      id: 1,
      icon: 'res://icon',
      title: 'CPS MÓVIL',
      text: 'FICHA PARA ' + afiliado
    });
  }
}