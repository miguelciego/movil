import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';
import {  errorServe } from '../error/error' 

@IonicPage()
@Component({
  selector: 'page-filiales',
  templateUrl: 'filiales.html',
  providers: [CpsProviders, errorServe]
})
export class FilialesPage {

  public FilialesEncontradas:any[]=[];
  public Paciente;
  public Ficha;
  public validarN;
  public validarB;
  public dpts;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cps: CpsProviders,
    public LoadCtrl: LoadingController,
    private alertCtrl:AlertController,
    public eServe:errorServe
    ) { 
      this.Ficha = navParams.get('Ficha');
      this.Paciente = navParams.get('Paciente');
      this.FilialesEncontradas = navParams.get('Filiales');
      this.validarN = navParams.get('cod');
      this.validarB = navParams.get('msj')
      console.log("el resultado de n es" ,this.validarN)

      this.Ficha.PacienteCodigo = this.Paciente.Codigo;
      this.Ficha.PacienteMatricula = this.Paciente.Matricula;
      this.Ficha.PacienteNombre = this.Paciente.Nombre ;
      this.Ficha.PacienteTAsegurado  = this.Paciente.TAsegurado ;
      this.Ficha.PacienteHClinica  = this.Paciente.HClinica;
      this.Ficha.PacienteAtendido  = this.Paciente.Atendido;
      this.Ficha.PacienteFicha  = this.Paciente.Ficha;


    }

  getFiliales() {
    /*let load = this.LoadCtrl.create({
      content: 'Cargando...',
      duration: 5000
    });
    load.present();*/
   
    /*this.cps.getFiliales(this.Ficha.dpts,this.Ficha.PacienteCodigo)
    .subscribe(data => {
      this.FilialesEncontradas = data.json();
      console.log("Filiales -> ", this.FilialesEncontradas)
      load.dismiss();
        Object.keys(this.FilialesEncontradas).forEach( key => {
          this.validarN = this.FilialesEncontradas[key].Codigo
          this.validarB = this.FilialesEncontradas[key].Nombre
        });
        console.log("El codigo de E es ->", this.validarN)
        if (this.validarN % 1 == 0) { this.validarN = 1}
        else{this.validarN = 2}
      },
      err => { if (err.status == 404) {
        } else {
            console.log(err.status);
            load.dismiss();
            this.AlertError();
        }
      },
      () => console.log('getFiliales -> completado')
    );*/
  }

  iraEspecialidades(Filial) {
    this.navCtrl.push('EspecialidadesPage', {  Ficha: this.Ficha, Filial: Filial });
  }

  volver(){
     this.navCtrl.pop();
  }

  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos ...',
      subTitle: '..Pero en entos momentos no podemos responder a tu solicitud.',
      buttons: ['Ok']
    });
    alert.present();
  }
}
