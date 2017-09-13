import { Component, ViewChild } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Content, App } from 'ionic-angular';
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
  //private historial: any[];
  //private length;

  constructor(
    private app: App,
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

  }

  /*Object.defineProperty(obj, "newDataProperty", {
    value: 101,
      writable: true,
        enumerable: true,
          configurable: true
  });*/

  update(Paciente) {
    console.log("matricula", Paciente.Matricula)
    this.gStorage.getAll()
      .then((data: any[]) => {
        Object.keys(data).forEach(key => {
          let t = data[key].Matricula;
          if (t == Paciente.Matricula) {
            let f = data[key].Ficha;
            f = "Con Ficha"
            console.log("si e encontro a ", t, Paciente.Matricula)
            console.log(f)
          }
        });
      })
      .catch(error => {
        console.log(error)
      })
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
              console.log("Consulta web service")
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
                  load.dismiss()
                },
                () => load.dismiss())
            }
            else {
              console.log("Consulta storage")
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
        if (this.validarN == "E2" || this.validarN == "E3") {
          console.log("E =>", this.validarN)
          this.presentModal(Paciente);
          load.dismiss()
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
        console.log(err.status);
        this.toastError();
        load.dismiss()
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
    this.navCtrl.push('Historial', {
      myPaciente: Paciente
    })
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  toastFicha() {
    let toast = this.toastCtrl.create({
      message: 'Se ha producido un error al buscar el historial de ficha. Inténtalo de nuevo',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
  toastError() {
    let toast = this.toastCtrl.create({
      message: 'Se ha producido un error. Inténtalo de nuevo',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
  test(){
    console.log("click en test")
  }
}