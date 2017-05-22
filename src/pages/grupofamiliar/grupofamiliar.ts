import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { CpsProviders } from '../../providers/cps';
import { FilialesPage } from '../filiales/filiales';
import { PerfilPage } from '../perfil/perfil';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';
import { VademecunPage } from '../vademecun/vademecun';

@Component({
  selector: 'page-grupofamiliar',
  templateUrl: 'grupofamiliar.html',
  providers: [CpsProviders]
})
export class GrupoFamiliarPage {

  aseg: string = "asegurado";
  isAndroid: boolean = true;
  
  public GrupoFamiliar;
  public id;
  public dpts;
  public Ficha = { PacienteCodigo : 0};
  public centros = 37901 ;

  constructor(
    platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private cps: CpsProviders,
    public modalCtrl: ModalController
    ){
      this.isAndroid = platform.is('android'); 
   }
  ionViewDidLoad() {
    console.log("pagina de grupo de familia");
     this.getGrupoFamiliar();
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  } 
  getGrupoFamiliar() {
    //console.log(this.centros);
    //this.Ficha.PacienteCodigo =  this.centros;
 /*   
    this.cps.getGFamiliar(this.Ficha.PacienteCodigo).subscribe(
      data => {
        this.GrupoFamiliar = data.json();
 //       console.log(this.GrupoFamiliar);
        },
        err => console.error(err),
        () => console.log('getGrupoFamiliar completed')
    );
*/
    this.GrupoFamiliar = this.cps.getGFamiliar1();
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
