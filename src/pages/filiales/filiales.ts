import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';
import { EspecialidadesPage } from '../especialidades/especialidades';
/*
  Generated class for the Filiales page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-filiales',
  templateUrl: 'filiales.html',
    providers: [CpsProviders]
})
export class FilialesPage {
  public FilialesEncontradas;
  public Paciente;
  public Ficha; // = { PacienteCodigo: 35433 }; 

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private cps: CpsProviders, private sanitizer:DomSanitizer ) { 
              this.Ficha = navParams.get('Ficha');
              this.Paciente = navParams.get('Paciente');

              this.Ficha.PacienteMatricula = this.Paciente.Matricula;
              this.Ficha.PacienteNombre = this.Paciente.Nombre ;
              this.Ficha.PacienteTAsegurado  = this.Paciente.TAsegurado ;
              this.Ficha.PacienteHClinica  = this.Paciente.HClinica;
              this.Ficha.PacienteAtendido  = this.Paciente.Atendido;
              this.Ficha.PacienteFicha  = this.Paciente.Ficha;
//console.log(this.Ficha);
              this.getFiliales();
               
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilialesPage');
  }

  getFiliales() {
    /*
    this.cps.getFiliales(this.Ficha.PacienteCodigo).subscribe(
      data => {
        this.FilialesEncontradas = data.json();
 //       console.log(this.FilialesEncontradas);
        },
      err => console.error(err),
      () => console.log('getFiliales completed')
    );
    */
  this.FilialesEncontradas =  this.cps.getFiliales1();
  }
  sanitize(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
 
  iraEspecialidades(Filial) {
    this.navCtrl.push(EspecialidadesPage, {  Ficha: this.Ficha, Filial: Filial });
  }

}
