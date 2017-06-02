import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { FilialesPage } from '../filiales/filiales';
import { PopoverController } from 'ionic-angular';
import { VademecunPage } from '../vademecun/vademecun';
import { PopoverPage } from '../mitab/popover';

import { AfiliadoStorage } from '../../providers/afiliado-storage';
import { CpsProviders } from '../../providers/cps';

@Component({
  selector: 'page-grupofamiliar',
  templateUrl: 'grupofamiliar.html',
  providers: [CpsProviders]
})
export class GrupoFamiliarPage {

  aseg: string = "asegurado";
  isAndroid: boolean = true;
  public dpts;
 
  public GrupoFamiliar:any;
  public myFicha:any[]=[];
  public Ficha = { PacienteCodigo : undefined};

  constructor(
    platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private cps: CpsProviders,
    public AfiliadoStorage : AfiliadoStorage,
    public LoadCtrl: LoadingController
    ){
      this.isAndroid = platform.is('android'); 
   }
  ionViewDidLoad() {
    let load = this.LoadCtrl.create();
    load.present();
    this.getGrupoFamiliar();
    load.dismiss()
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  getGrupoFamiliar() {
    this.AfiliadoStorage.getAll()
    .then((data: any[]) =>{
      Object.keys(data).forEach( key => { 
          this.Ficha.PacienteCodigo =  data[key].Id;
          this.dpts = data[key].filial;
      });
        this.cps.getGFamiliar(this.dpts,this.Ficha.PacienteCodigo)
        .subscribe( data =>{
        this.GrupoFamiliar = data;
      },
      err => console.error(err),
      () => console.log("GRUPO FAMILIAR ->",this.GrupoFamiliar))
    })
    .catch(error =>{
      console.log(error)
    })
  }
  iraFiliales(Paciente) {
    this.Ficha.PacienteCodigo = Paciente.Codigo;
    if( Paciente.Ficha == "Sin ficha" ){
      this.navCtrl.push(FilialesPage, {  Ficha: this.Ficha, Paciente: Paciente });
    } else {
       this.presentModal(Paciente);
    }
  }
  presentModal(Paciente) {
    let modal = this.modalCtrl.create(ModalPage,{ Paciente: Paciente});
    modal.present();
  }
  IrVademecun(){
  	this.navCtrl.push( VademecunPage );
  }
  actualizar(refresher) {
		this.getGrupoFamiliar();
    setTimeout(() => {
    refresher.complete();
    }, 2000);
  }
}