import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';
import { FilialesPage } from '../filiales/filiales';
import { VademecunPage } from '../vademecun/vademecun';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';

@Component({
  selector: 'page-grupofamiliar',
  templateUrl: 'grupofamiliar.html',
  providers: [CpsProviders]
})
export class GrupoFamiliarPage {
  aseg: string = "asegurado";
  isAndroid: boolean = true;
  public GrupoFamiliar;
  public Ficha = { PacienteCodigo: 37901 };
  public centros = 37901 ;

  constructor(public navCtrl: NavController, public navParams: NavParams,platform: Platform,public popoverCtrl: PopoverController,
              private cps: CpsProviders) {
                this.isAndroid = platform.is('android');
                this.getGrupoFamiliar();
              }
   presentPopover(myEvent) {
    
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad GrupofamiliarPage');
  }
   getGrupoFamiliar() {
     console.log(this.centros);
    this.Ficha.PacienteCodigo =  this.centros;
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
    this.navCtrl.push(FilialesPage, {  Ficha: this.Ficha, Paciente: Paciente });
  }
  irVademecun(Paciente) {
    this.navCtrl.push(VademecunPage, { Paciente: Paciente });
  }


}
