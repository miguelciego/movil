import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';
import { HorariosPage } from '../horarios/horarios';
import { DetalleMedPage } from '../detalle-med/detalle-med';
import { AfiliadoStorage } from '../../providers/afiliado-storage';

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
  public dpts;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private cps: CpsProviders,
  public AfiliadoStorage : AfiliadoStorage,
  public LoadCtrl: LoadingController
  ){
    this.Especialidad = navParams.get('Especialidad');
    this.Ficha = navParams.get('Ficha');
      
    this.Ficha.EspecialidadCodigo = this.Especialidad.Valor;
    this.Ficha.EspecialidadDescripcion = this.Especialidad.Descripcion;
    this.listMedicos();
  }
  listMedicos(){
    let load = this.LoadCtrl.create();
    load.present();
    this.AfiliadoStorage.getAll()
    .then((data: any[]) =>{
      Object.keys(data).forEach( key => { 
          this.Ficha.PacienteCodigo =  data[key].Id;
          this.dpts = data[key].filial;
      });
      this.cps.getMedicos(this.dpts,this.Ficha.FilialCodigo,this.Ficha.EspecialidadCodigo,
      this.Ficha.Fecha).subscribe(
        data => { 
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
    })
    .catch(error =>{
      console.log(error)
    })  
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
