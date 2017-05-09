import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VademecunPage } from '../vademecun/vademecun';

/*
  Generated class for the Perfil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  public myPaciente;
  public NombrePaciente;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myPaciente = navParams.get('Paciente');
    this.NombrePaciente = this.myPaciente.Nombre;
    console.log(' Vademecun-Codigo de myPaciente:'+" "+this.myPaciente.Codigo);
  }
  irVademecun() {
    this.navCtrl.push(VademecunPage);
  }
}
