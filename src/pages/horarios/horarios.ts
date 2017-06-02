import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';
import { ResumenPage } from '../resumen/resumen';
import { AfiliadoStorage } from '../../providers/afiliado-storage';

@Component({
  selector: 'page-horarios',
  templateUrl: 'horarios.html',
  providers: [CpsProviders]

})
export class HorariosPage {

  public Medico;
  public Horarios;
  public Ficha;
  public length;
  public dpts;

  constructor(public navCtrl: NavController,
  public navParams: NavParams, 
  private cps: CpsProviders,
  public AfiliadoStorage : AfiliadoStorage,
  public LoadCtrl: LoadingController,
  ) {
    this.Medico = navParams.get('Medico');
    this.Ficha = navParams.get('Ficha');

    this.Ficha.MedicoCodigo = this.Medico.Valor;
    this.Ficha.MedicoNombre = this.Medico.Descripcion;
    this.listHorarios();
  }
  listHorarios(){
    let load = this.LoadCtrl.create();
    load.present();
    this.AfiliadoStorage.getAll()
    .then((data: any[]) =>{
      Object.keys(data).forEach( key => { 
          this.Ficha.PacienteCodigo =  data[key].Id;
          this.dpts = data[key].filial;
      });
      this.cps.getHorarios(this.dpts,this.Ficha.FilialCodigo,this.Ficha.EspecialidadCodigo,this.Ficha.MedicoCodigo,this.Ficha.Fecha)
        .subscribe(data => { 
          this.Horarios = data.json();
          this.length = this.Horarios.length;
          load.dismiss(); 
        },
      err => {
        if (err.status == 404) {
       //   this.readme = 'Este repo no tiene README. :(';
        } else {
          console.error(err);
        }
      },
      () => console.log('getHorarios -> completado')
    );
    })
    .catch(error =>{
      console.log(error)
    })  
  }
  irResumen(Hora) {
    this.navCtrl.push(ResumenPage,{ Hora : Hora, Ficha: this.Ficha });
  }
   volver(){
    this.navCtrl.pop();
  }
}
