import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';
import { MedicosPage } from '../medicos/medicos';

@Component({
  selector: 'page-especialidades',
  templateUrl: 'especialidades.html',
  providers: [CpsProviders]
   
})
export class EspecialidadesPage {
  public Filial;
  public Especialidades;
  public Ficha;

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams, 
  private cps: CpsProviders
  ) {
    this.Ficha = navParams.get('Ficha');
    this.Filial = navParams.get('Filial');
    
    this.Ficha.FilialCodigo = this.Filial.Codigo;
    this.Ficha.FilialDescripcion = this.Filial.Nombre ;
    this.Ficha.Fecha  = this.Filial.Fecha ;
 //   console.log(this.Ficha);
/*
    this.cps.getEspecialidades(this.Filial.Codigo,this.Filial.Fecha).subscribe(
      data => { 
        this.Especialidades = data.json();
        },
      err => {
        if (err.status == 404) {
       //   this.readme = 'Este repo no tiene README. :(';
        } else {
          console.error(err);
        }
      },
      () => console.log('getEspecialidades completed')
    );
 */   
    this.Especialidades = this.cps.getEspecialidades1();
  }
  iraMedicos(Especialidad) {
    this.navCtrl.push(MedicosPage, { Especialidad: Especialidad, Ficha: this.Ficha });
  } 
}
