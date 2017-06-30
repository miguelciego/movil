import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class Perfil {
  public myPaciente;
  public dpts;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.myPaciente = navParams.get('Paciente');
    this.dpts = navParams.get('dpts');
    console.log(' Vademecun-Codigo de myPaciente:'+" "+this.myPaciente.Codigo);
  }

  ionViewDidLoad() {}
  irVademecun(){
    this.navCtrl.push('VademecunPage',{ Codigo: this.myPaciente.Codigo, dpts: this.dpts })
  }
  irHistorial(){
     this.navCtrl.push('Historial',{ myPaciente: this.myPaciente, dpts: this.dpts,  })
  }
}
