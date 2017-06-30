import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ToastController, Content, App } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { PopoverPage } from '../mitab/popover';

import { AfiliadoStorage } from '../../providers/afiliado-storage';
import { CpsProviders } from '../../providers/cps';


@IonicPage()
@Component({
  selector: 'page-grupofamiliar',
  templateUrl: 'grupofamiliar.html',
  providers: [CpsProviders]
})
export class GrupoFamiliarPage {
  @ViewChild(Content) content: Content;

  aseg: string = "asegurado";
  isAndroid: boolean = true;

  public GrupoFamiliar: any;
  public myFicha: any[] = [];
  public Ficha = {
    PacienteCodigo: undefined,
    dpts: undefined
  };
  public FilialesEncontradas;
  public validarN;
  public validarB;

  constructor(
    public app: App,
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private cps: CpsProviders,
    public AfiliadoStorage: AfiliadoStorage,
    public LoadCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.isAndroid = platform.is('android');
    this.app._setDisableScroll(true);
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    let load = this.LoadCtrl.create({
      content: 'Cargando...'
    });
    load.onDidDismiss(() => {
      console.log("ha terminado")
    });
    load.present()
      .then(() => {
        this.AfiliadoStorage.getAll()
          .then((data: any[]) => {
            Object.keys(data).forEach(key => {
              this.Ficha.PacienteCodigo = data[key].Id;
              this.Ficha.dpts = data[key].filial;
            });
            this.cps.getGFamiliar(this.Ficha.dpts, this.Ficha.PacienteCodigo)
              .subscribe(data => {
                this.GrupoFamiliar = data;
                console.log("Grupo familiar ", this.GrupoFamiliar)
                load.dismiss()
              },
              err => {
                if (err.status == 404) {
                } else {
                  console.log(err.status);
                  this.AlertError();
                  load.dismiss()
                }
              },
              () => console.log("termino"))
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  iraFiliales(Paciente) {
    console.log("codigo del paciente", Paciente.Codigo)
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      duration: 5000
    });
    load.present();
    this.cps.getFiliales(this.Ficha.dpts, Paciente.Codigo)
      .subscribe(data => {

        this.FilialesEncontradas = data.json();
        load.dismiss()
        console.log("Filiales -> ", this.FilialesEncontradas)
        Object.keys(this.FilialesEncontradas).forEach(key => {
          this.validarN = this.FilialesEncontradas[key].Codigo
          this.validarB = this.FilialesEncontradas[key].Nombre
        });
        console.log("El codigo de E es ->", this.validarN)
        if (this.validarN == "E2" || this.validarN == "E3") {
          this.presentModal(Paciente);
        }
        else {
          if (this.validarN % 1 == 0) {
            this.validarN = 1
          }
          else { this.validarN = 2 }
          this.navCtrl.push('FilialesPage', {
            cod: this.validarN,
            msj: this.validarB,
            Ficha: this.Ficha,
            Paciente: Paciente,
            Filiales: this.FilialesEncontradas,
          });
        }
      },
      err => {
        if (err.status == 404) {
        } else {
          console.log(err.status);
          this.AlertError();
        }
      },
      () => console.log("termino")
      );
  }

  presentModal(Paciente) {
    let modal = this.modalCtrl.create('ModalPage', { Paciente: Paciente.Codigo, Ficha: this.Ficha });
    modal.present();
  }

  IrVademecun() {
    this.navCtrl.push('VademecunPage');
  }

  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [{ text: 'Bueno', handler: () => { this.platform.exitApp(); } }]
    });
    alert.present();
  }
  /*actualizar(refresher) {
		//this.getGrupoFamiliar();
    setTimeout(() => {
    refresher.complete();
    }, 1000);
  }*/
  irPerfil(Paciente) {
    this.navCtrl.push('Perfil', { Paciente: Paciente, dpts: this.Ficha.dpts });
  }
}