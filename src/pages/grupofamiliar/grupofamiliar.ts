import { Component, ViewChild } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Content, App } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { popoverUpdatePage } from '../mitab/popoverUpdate';

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

  codigoAseg:number;
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
  ) {}

  ionViewDidLoad() {
    let load = this.LoadCtrl.create({
      content: 'Cargando...'
    });
    this.aStorage.getAll()
      .then((result: any) => {
        Object.keys(result).forEach(key => {
          this.codigoAseg = result[key].Id;
          this.Ficha.dpts = result[key].filial;
        });
        this.gStorage.getAll()
          .then((data: any[]) => {
            if (data == null) {
              load.present();
              console.log("Consulta web service")
              this.cps.getGFamiliar(this.Ficha.dpts, this.codigoAseg)
                .subscribe(data => {
                  this.GrupoFamiliar = data
                  this.mostrar = true;
                  this.gStorage.create(this.GrupoFamiliar)
                    .then(data => {
                      console.log("Grupo Familiar Storage : Agregado Correctamente")
                    })
                    .catch(error => {
                      console.log(error)
                    })
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
    this.Ficha.PacienteCodigo = Paciente.Codigo;
    this.cps.getFiliales(this.Ficha.dpts, this.Ficha.PacienteCodigo)
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
    this.navCtrl.push('VademecunPage', { 
      myPaciente: Paciente,
      dpts: this.Ficha.dpts
     });
  }

  irHistorial(Paciente) {
    this.navCtrl.push('Historial', {
      myPaciente: Paciente,
      dpts: this.Ficha.dpts
    })
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(popoverUpdatePage);
    popover.present({
      ev: myEvent
    });
  }

  toastError() {
    let toast = this.toastCtrl.create({
      message: 'Se ha producido un error. Inténtalo de nuevo',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}