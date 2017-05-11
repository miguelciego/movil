import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage {

  public Ficha;
  public getHora;
  public NombrePaciente;
  public Matricula;
  public Filial;
  public Especialidad;
  public Medico;
  public Hora;
  public Dia;
  constructor(
  public navCtrl: NavController,
  public navParams: NavParams
  ){
    this.getHora = navParams.get('Hora');
    this.Ficha = navParams.get('Ficha');
    this.Ficha.valorh = this.getHora.Valor;
    this.Ficha.horaD = this.getHora.Descripcion;
    this.NombrePaciente = this.Ficha.PacienteNombre;
    this.Matricula = this.Ficha.PacienteMatricula;
    this.Filial= this.Ficha.FilialDescripcion;
    this.Especialidad = this.Ficha.EspecialidadDescripcion;
    this.Medico = this.Ficha.MedicoNombre;
    this.Hora = this.Ficha.horaD;
    this.Dia = this.Ficha.Fecha;
    console.log(this.Ficha);
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
