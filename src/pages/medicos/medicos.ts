import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';
import { HorariosPage } from '../horarios/horarios';

@Component({
  selector: 'page-medicos',
  templateUrl: 'medicos.html',
  providers: [CpsProviders]

})
export class MedicosPage {
  public Medicos;
  public Especialidad;
  public Ficha;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private cps: CpsProviders,
  public LoadCtrl: LoadingController
  ) {
    this.Especialidad = navParams.get('Especialidad');
    this.Ficha = navParams.get('Ficha');
    
    this.Ficha.EspecialidadCodigo = this.Especialidad.Valor;
    this.Ficha.EspecialidadDescripcion = this.Especialidad.Descripcion;
    this.listMedicos();
  }
  listMedicos(){
    let load = this.LoadCtrl.create();
      load.present();
    this.Medicos = this.cps.getMedicos1();
      load.dismiss();
    /*
    this.cps.getMedicos(this.Ficha.FilialCodigo,this.Ficha.EspecialidadCodigo,
              this.Ficha.Fecha).subscribe(
      data => { 
        this.Medicos = data.json();

        },
      err => {
        if (err.status == 404) {
       //   this.readme = 'Este repo no tiene README. :(';
        } else {
          console.error(err);
        }
      },
      () => console.log('getMedico completed')
    );
*/ 
  }
  iraHorarios(Medico) {
    this.navCtrl.push(HorariosPage, { Medico: Medico, Ficha: this.Ficha });
  }
}
