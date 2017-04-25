import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';
import { FilialesPage } from '../filiales/filiales';


@Component({
  selector: 'page-grupofamiliar',
  templateUrl: 'grupofamiliar.html',
  providers: [CpsProviders]
})
export class GrupoFamiliarPage {
  public GrupoFamiliar;
  public Ficha = { PacienteCodigo: 37901 };
  public centros = 37901 ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private cps: CpsProviders) {
                this.getGrupoFamiliar();
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


}
