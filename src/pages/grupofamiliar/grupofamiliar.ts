import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { FilialesPage } from '../filiales/filiales';
import { PerfilPage } from '../perfil/perfil';
import { PopoverController } from 'ionic-angular';
import { VademecunPage } from '../vademecun/vademecun';

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
 
  public GrupoFamiliar:any[]= [];
  public Ficha = { PacienteCodigo : undefined};

  constructor(
    platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private cps: CpsProviders,
    public AfiliadoStorage : AfiliadoStorage
    ){
      this.isAndroid = platform.is('android'); 
   }
  ionViewDidLoad() {
     this.getGrupoFamiliar();
  } 
  getGrupoFamiliar() {
    this.AfiliadoStorage.getAll()
    .then((data: any[]) =>{
      Object.keys(data).forEach( key => {
          this.Ficha.PacienteCodigo =  data[key].Id;
      });
      this.cps.getGFamiliar(this.Ficha.PacienteCodigo)
        .subscribe( data => { 
          this.GrupoFamiliar = data.json();
        },
        err => console.error(err),
        () => console.log('getGrupoFamiliar -> completado')
      );
    })
    .catch(error =>{
      console.log(error)
    })
    console.log("el codigo es ",this.Ficha.PacienteCodigo);
    
   /* this.GrupoFamiliar = this.cps.getGFamiliar1();*/
  }
  iraFiliales(Paciente) {
    this.Ficha.PacienteCodigo = Paciente.Codigo;
    if(Paciente.Ficha == "Sin ficha"){
      this.navCtrl.push(FilialesPage, {  Ficha: this.Ficha, Paciente: Paciente });
    }else{
       this.presentModal(Paciente);
    }
  }
  presentModal(Paciente) {
    let modal = this.modalCtrl.create(ModalPage,{ Paciente: Paciente});
    modal.present();
  }

  irPerfil(Paciente){
     this.navCtrl.push(PerfilPage, { Paciente: Paciente });
  }

  IrVademecun(){
    this.navCtrl.push(VademecunPage);
  }
}