import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ResumenPage } from '../resumen/resumen';

import { CpsProviders } from '../../providers/cps';

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

  constructor(public navCtrl: NavController,
  public navParams: NavParams, 
  private cps: CpsProviders,
  public LoadCtrl: LoadingController,
  ) {
    this.Medico = navParams.get('Medico');
    this.Ficha = navParams.get('Ficha');

    this.Ficha.MedicoCodigo = this.Medico.Valor;
    this.Ficha.MedicoNombre = this.Medico.Descripcion;
    this.listHorarios();
  }
  listHorarios(){
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      duration: 5000
    });
    load.present();
      this.cps.getHorarios(this.Ficha.dpts,this.Ficha.FilialCodigo,this.Ficha.EspecialidadCodigo,this.Ficha.MedicoCodigo,this.Ficha.Fecha)
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
  }
  irResumen(Hora) {
    this.navCtrl.push(ResumenPage,{ Hora : Hora, Ficha: this.Ficha });
  }
   volver(){
    this.navCtrl.pop();
  }
}
