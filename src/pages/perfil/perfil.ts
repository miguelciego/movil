import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistorialPage } from '../historial/historial';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  public myPaciente;
  public NombrePaciente;
  public Empresa ="Caja Petrolera de Salud";
  public FechaT ="25 de Mayo 2005";

   constructor(
   public navCtrl: NavController,
   public navParams: NavParams
  ){
    this.myPaciente = navParams.get('Paciente');
    this.NombrePaciente = this.myPaciente.Nombre;
    this.Empresa;
    this.FechaT;
    console.log(' Vademecun-Codigo de myPaciente:'+" "+this.myPaciente.Codigo);
  }
  irHistorial() {
    this.navCtrl.push(HistorialPage);
  }
}
