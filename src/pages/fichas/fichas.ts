import { Component } from '@angular/core';
import { CpsProviders } from '../../providers/cps';
import { NavController, NavParams } from 'ionic-angular';
import { EspecialidadesPage } from '../especialidades/especialidades';

@Component({
  selector: 'page-fichas',
  templateUrl: 'fichas.html',
  providers: [CpsProviders]
})

export class FichasPage {
  public FilialesEncontradas;
  public Ficha = { PacienteCodigo: 35433 }; 

  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private cps: CpsProviders) {
  //              console.log(this.Ficha.PacienteCodigo);
    this.getFiliales();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichasPage'); 
  };

  ionViewDidEnter(){
    console.log('ver FichasPage');
  //  this.EspecialidadesEncontradas = [{ }];
  };

  getFiliales() {
    this.cps.getFiliales(this.Ficha.PacienteCodigo).subscribe(
      data => {
        this.FilialesEncontradas = data.json();
        console.log(this.FilialesEncontradas);
        },
      err => console.error(err),
      () => console.log('getFiliales completed')
    );
  }

  getFilialtest() {
   this.FilialesEncontradas = [
  {
    "Codigo": 2,
    "Nombre": "POLICONSULTORIO SANTA CRUZ",
    "Direccion": null,
    "Fecha": "2017-03-24"
  },
  {
    "Codigo": 3,
    "Nombre": "GUARACACHI",
    "Direccion": null,
    "Fecha": "2017-03-24"
  },
  {
    "Codigo": 4,
    "Nombre": "POLICONSULTORIO NORTE",
    "Direccion": null,
    "Fecha": "2017-03-24"
  }
] 
  }

  iraEspecialidades(Filial) {
    this.navCtrl.push(EspecialidadesPage, {  Ficha: this.Ficha, Filial: Filial });
  }

}
