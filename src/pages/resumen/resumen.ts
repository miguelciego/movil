import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';

@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
  providers: [CpsProviders]
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

  private datos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cps: CpsProviders,
    public LoadCtrl: LoadingController
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
  ionViewDidLoad() {}
  Guardar(){
    this.cps.putGFicha(
        this.Ficha.PacienteCodigo,
        this.Ficha.FilialCodigo,
        this.Ficha.EspecialidadCodigo,
        this.Ficha.MedicoCodigo,
        this.Ficha.valorh,
        this.Ficha.Fecha
      )
      .subscribe( data => { 
          let load = this.LoadCtrl.create();
          load.present();
          this.datos = data.json();
          switch (this.datos.Codigo) {
            case "G0":
                console.log(this.datos.Descripcion)
                this.navCtrl.popToRoot();
                load.dismiss();
                break;
            case "E1":
                load.dismiss();
                console.log(this.datos.Descripcion)
                this.navCtrl.popToRoot();
                break;
            case "E2":
                load.dismiss();
                console.log(this.datos.Descripcion)
                this.navCtrl.pop();
                break;
          }
        },
        err => console.error(err),
        () => console.log('putGFicha -> completado')
      );
  }
  cancelar(){
    this.navCtrl.pop();
  }
}