import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { HorariosPage } from '../horarios/horarios';
import { DetalleMedPage } from '../detalle-med/detalle-med';
import { CpsProviders } from '../../providers/cps';

@Component({
  selector: 'page-medicos',
  templateUrl: 'medicos.html',
  providers: [CpsProviders]

})
export class MedicosPage {
  public Medicos;
  public Especialidad;
  public Ficha;
  public length;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private cps: CpsProviders,
  public LoadCtrl: LoadingController
  ){
    this.Especialidad = navParams.get('Especialidad');
    this.Ficha = navParams.get('Ficha');
      
    this.Ficha.EspecialidadCodigo = this.Especialidad.Valor;
    this.Ficha.EspecialidadDescripcion = this.Especialidad.Descripcion;
    this.listMedicos();
  }
  listMedicos(){
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      duration: 5000
    });
    load.present();

    this.cps.getMedicos(
      this.Ficha.dpts,
      this.Ficha.FilialCodigo,
      this.Ficha.EspecialidadCodigo,
      this.Ficha.Fecha
    )
    .subscribe(data => { 
        this.Medicos = data.json();
        this.length = this.Medicos.length;
        },
      err => {
        if (err.status == 404) {
      //   this.readme = 'Este repo no tiene README. :(';
        } else {
          console.error(err);
          load.dismiss()
        }
      },
      () => load.dismiss()
    );
  }
  iraHorarios(Medico) {
    this.navCtrl.push(HorariosPage, { Medico: Medico, Ficha: this.Ficha });
  }
  irDetalleMed(Medico){
     this.navCtrl.push(DetalleMedPage, { Medico: Medico});
  }
  volver(){
    this.navCtrl.pop();
  }
}
