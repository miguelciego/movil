import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage {

  public Ficha;  
  public Paciente;
  public Matricula;
  public Filial;
  public Especialidad;
  public Medico;
  public resumen={};
  public Hora;
  constructor(
  public navCtrl: NavController,
  public navParams: NavParams
  ){
  this.Hora = navParams.get('Hora');
  this.Ficha = navParams.get('Ficha');
  this.Ficha.valorh = this.Hora.Valor;
  this.Ficha.horaD = this.Hora.Descripcion;
  console.log(this.Ficha);
  this.Paciente = this.Ficha.PacienteNombre;
  this.resumen = this.Ficha;

  }
  ionViewDidLoad() {
  }
  Guardar(){
    this.navCtrl.popToRoot();
  }
  cancelar(){
    this.navCtrl.popToRoot();
  }
}
