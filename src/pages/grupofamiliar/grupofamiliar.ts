import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ToastController, Content, App } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';

import { AfiliadoStorage } from '../../providers/afiliado-storage';
import { gFamiliarStorage } from '../../providers/grupoFamiliar-storage';
import { CpsProviders } from '../../providers/cps';
import { Storage } from '@ionic/storage';

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
  private mostrar: boolean;
  public GrupoFamiliar: any[];
  private Ficha = {
    PacienteCodigo: undefined,
    dpts: undefined
  };
  private FilialesEncontradas;
  private validarN;
  private validarB;
  private historial: any[];
  private length;

  /*NOTA : Optimizar el método  ionViewDidLoad() y doRefresh() */

  constructor(
    private app: App,
    private platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private cps: CpsProviders,
    private aStorage: AfiliadoStorage,
    private gStorage: gFamiliarStorage,
    private LoadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.isAndroid = platform.is('android');
  }
  ionViewDidLoad() {
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    load.present();
    this.aStorage.getAll()
      .then((result: any) => {
        Object.keys(result).forEach(key => {
          this.Ficha.PacienteCodigo = result[key].Id;
          this.Ficha.dpts = result[key].filial;
        });
        this.gStorage.getAll()
          .then((data: any[]) => {
            if (data == null) {
              console.log("if")
              this.cps.getGFamiliar(this.Ficha.dpts, this.Ficha.PacienteCodigo)
                .subscribe(data => {
                  this.GrupoFamiliar = data
                  this.mostrar = true;
                  this.gStorage.create(this.GrupoFamiliar)
                    .then(data => {
                      console.log("Grupo Familiar Storage : Agregado Correctamente")
                    })
                    .catch(error => {
                    })
                  console.log(" Completado : GrupoFamiliar => ", this.GrupoFamiliar)
                },
                err => {
                  console.log(err.status);
                  this.mostrar = false;
                  this.AlertError();
                  load.dismiss()
                },
                () => load.dismiss())
            }
            else {
              console.log("else")
              this.mostrar = true;
              this.GrupoFamiliar = data
              load.dismiss()
            }
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
      dismissOnPageChange: true
    });
    load.present();
    this.cps.getFiliales(this.Ficha.dpts, Paciente.Codigo)
      .subscribe(data => {
        this.FilialesEncontradas = data.json();
        Object.keys(this.FilialesEncontradas).forEach(key => {
          this.validarN = this.FilialesEncontradas[key].Codigo
          this.validarB = this.FilialesEncontradas[key].Nombre
        });
        console.log("El codigo de E es ->", this.validarN)
        if (this.validarN == "E2" || this.validarN == "E3") {
          this.presentModal(Paciente);
          load.dismiss()
          console.log("Compleado : modaPage ")
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
          load.dismiss()
        }
      },
      () => console.log(" Compleado : filialesPage ")
      );
  }
  presentModal(Paciente) {
    let modal = this.modalCtrl.create('ModalPage', { Paciente: Paciente.Codigo, Ficha: this.Ficha });
    modal.present();
  }
  IrVademecun(Paciente) {
    this.navCtrl.push('VademecunPage', { myPaciente: Paciente });
  }
  irHistorial(Paciente) {
    let load = this.LoadCtrl.create({
      content: 'Cargando historial de ficha...',
      dismissOnPageChange: true
    });
    load.present();
    this.cps.getHistorial(Paciente.Codigo)
      .subscribe(data => {
        this.historial = data.json();
        this.length = this.historial.length;
        this.navCtrl.push('Historial', {
          myPaciente: Paciente,
          historial: this.historial,
          length: this.length
        })
      },
      err => {
        if (err.status == 404) {
        } else {
          console.log(err.status);
          load.dismiss()
        }
      },
      () => console.log("Termino historial")
      );
  }
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [{
        text: 'Listo', handler: () => {
          console.log("AlerError : Se ha Ejecutado")
        }
      }]
    });
    alert.present();
  }
  doRefresh(refresher) {
    this.aStorage.getAll()
      .then((result: any) => {
        Object.keys(result).forEach(key => {
          this.Ficha.PacienteCodigo = result[key].Id;
          this.Ficha.dpts = result[key].filial;
        });
        this.cps.getGFamiliar(this.Ficha.dpts, this.Ficha.PacienteCodigo)
          .subscribe(data => {
            this.GrupoFamiliar = data
            this.mostrar = true;
            console.log("Limpio Storage")
            this.storage.remove('grupoFamiliar')
            this.gStorage.create(this.GrupoFamiliar)
              .then(data => {
                console.log("Grupo Familiar Storage : Agregado Correctamente")
              })
              .catch(error => {
              })
            refresher.complete()
            this.actualizaToast()
            console.log(" Completado : GrupoFamiliar => ", this.GrupoFamiliar)
          },
          err => {
            console.log(err.status);
            refresher.complete()
            this.noActualizaToast();
          },
          () => console.log("Termino de actualizar"))
      })
      .catch(error => {
        console.log(error)
      })
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  actualizaToast() {
    let toast = this.toastCtrl.create({
      message: 'Actualizado correctamente.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  noActualizaToast() {
    let toast = this.toastCtrl.create({
      message: 'Error al Actualizar.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}