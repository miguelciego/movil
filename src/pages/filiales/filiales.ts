import { Component } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';
import { EspecialidadesPage } from '../especialidades/especialidades';

import { AfiliadoStorage } from '../../providers/afiliado-storage';

@Component({
  selector: 'page-filiales',
  templateUrl: 'filiales.html',
  providers: [CpsProviders]
})
export class FilialesPage {
  public FilialesEncontradas;
  public Paciente;
  public Ficha;
  public validarN;
  public validarB;
  public dpts;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cps: CpsProviders,
    public AfiliadoStorage : AfiliadoStorage,
    private sanitizer:DomSanitizer,
    public LoadCtrl: LoadingController
    ) { 
      this.Ficha = navParams.get('Ficha');
      this.Paciente = navParams.get('Paciente');

      this.Ficha.PacienteMatricula = this.Paciente.Matricula;
      this.Ficha.PacienteNombre = this.Paciente.Nombre ;
      this.Ficha.PacienteTAsegurado  = this.Paciente.TAsegurado ;
      this.Ficha.PacienteHClinica  = this.Paciente.HClinica;
      this.Ficha.PacienteAtendido  = this.Paciente.Atendido;
      this.Ficha.PacienteFicha  = this.Paciente.Ficha;
    }
  ionViewDidLoad() {
    this.getFiliales();
  }
  getFiliales() {
    let load = this.LoadCtrl.create();
    load.present();
    this.AfiliadoStorage.getAll()
    .then((data: any[]) =>{
      Object.keys(data).forEach( key => { 
          this.Ficha.PacienteCodigo =  data[key].Id;
          this.dpts = data[key].filial;
      });
      this.cps.getFiliales(this.dpts,this.Ficha.PacienteCodigo).subscribe(
        data => {
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
        err => console.error(err),
        () => console.log('getFiliales -> completado')
      );
    })
    .catch(error =>{
      console.log(error)
    })
  }
  sanitize(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  iraEspecialidades(Filial) {
    this.navCtrl.push(EspecialidadesPage, {  Ficha: this.Ficha, Filial: Filial });
  }
  volver(){
    this.navCtrl.pop();
  }
}
