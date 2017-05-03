import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';
//import { HorariosPage } from '../horarios/horarios';

@Component({
  selector: 'page-horarios',
  templateUrl: 'horarios.html',
  providers: [CpsProviders]

})
export class HorariosPage {

  public Medico;
  public Horarios;
  public Ficha;

  constructor(public navCtrl: NavController,
  public navParams: NavParams, 
  private cps: CpsProviders
  ) {
        
    this.Medico = navParams.get('Medico');
    this.Ficha = navParams.get('Ficha');

    this.Ficha.MedicoCodigo = this.Medico.Valor;
    this.Ficha.MedicoNombre = this.Medico.Descripcion;
  /*  
    this.cps.getHorarios(this.Ficha.FilialCodigo,this.Ficha.EspecialidadCodigo,
              this.Ficha.MedicoCodigo,this.Ficha.Fecha).subscribe(
      data => { 
        this.Horarios = data.json();
     //   console.log(this.Horarios);
        },
      err => {
        if (err.status == 404) {
       //   this.readme = 'Este repo no tiene README. :(';
        } else {
          console.error(err);
        }
      },
      () => console.log('getHorarios completed')
    );
  */  
  
    this.Horarios = this.cps.getHorarios1();
    console.log("ficha");
    console.log(this.Ficha);
  }
    iraHorarios() {
    this.navCtrl.popToRoot();
  }
}
