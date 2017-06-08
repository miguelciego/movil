import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
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
 
  public GrupoFamiliar:any;
  public myFicha:any[] =[];
  public Ficha = { 
    PacienteCodigo: undefined,
    dpts: undefined
  };

  constructor(
    platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private cps: CpsProviders,
    public AfiliadoStorage : AfiliadoStorage,
    public LoadCtrl: LoadingController,
    private alertCtrl: AlertController
    ){
      this.isAndroid = platform.is('android');
      this.getGrupoFamiliar();  
   }
  ionViewDidLoad(){}

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  getGrupoFamiliar() {
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      duration:5000
    });
    load.present();
    this.AfiliadoStorage.getAll()
    .then((data: any[]) =>{
      Object.keys(data).forEach( key => { 
          this.Ficha.PacienteCodigo =  data[key].Id;
          this.Ficha.dpts = data[key].filial;
      });
        this.cps.getGFamiliar(this.Ficha.dpts ,this.Ficha.PacienteCodigo)
        .subscribe( data =>{
        this.GrupoFamiliar = data;
        console.log("Grupo familiar ", this.GrupoFamiliar)
      },
      err => { if (err.status == 404) {
        } else {
            console.log(err.status);
            load.dismiss();
            this.AlertError();
          }
        },
      () => load.dismiss())
    })
    .catch(error =>{
      console.log(error)
    })
  }

  iraFiliales(Paciente) {
    console.log("codigo del paciente", Paciente.Codigo)
     this.cps.getMFicha(this.Ficha.dpts, Paciente.Codigo)
     .subscribe(data => { 
        this.myFicha = data.json();
        if(this.myFicha.length == 0){
          this.navCtrl.push(FilialesPage, {  Ficha: this.Ficha, Paciente: Paciente });
          console.log("es vacia")
        }else{
          console.log("no es vacia")
           this.presentModal();
        }
     },
     )
   /* if( Paciente.Ficha == "Sin ficha" ){
     this.navCtrl.push(FilialesPage, {  Ficha: this.Ficha, Paciente: Paciente });
    } else {
       this.presentModal(Paciente);
    }*/
  }

  presentModal() {
    let modal = this.modalCtrl.create(ModalPage,{ myFicha: this.myFicha, Ficha: this.Ficha });
    modal.present();
  }

  IrVademecun(){
  	this.navCtrl.push( VademecunPage );
  }

  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos ...',
      subTitle: '..Pero en entos momentos no podemos responder a tu solicitud.',
      buttons: ['Ok']
    });
    alert.present();
  }

  actualizar(refresher) {
		this.getGrupoFamiliar();
    setTimeout(() => {
    refresher.complete();
    }, 2000);
  }
}