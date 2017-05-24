import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
  providers: [CpsProviders]
})
export class ModalPage {
  public myFicha; 
  public myPaciente;


  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public viewCtrl: ViewController,
  private cps: CpsProviders
  ) {
    this.myPaciente = navParams.get('Paciente');
    console.log('myFicha-Codigo de myPaciente:'+" "+this.myPaciente.Codigo);
    this.Mostrarficha();
  }
  Mostrarficha(){
    /*this.myFicha = this.cps.getMFicha1();*/
    this.cps.getMFicha(this.myPaciente.Codigo).subscribe(
      data => {
        this.myFicha = data.json();
        console.log(this.myFicha);
        },
        err => console.error(err),
        () => console.log('Se ha completado la accion')
    );
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
