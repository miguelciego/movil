import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
  providers: [CpsProviders]
})
export class ModalPage {
  public myFicha:any[]=[]; 
  public myPaciente;
  public errorMysql:any =0;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public viewCtrl: ViewController,
  private cps: CpsProviders
  ) {
    this.myPaciente = navParams.get('Paciente');
    this.Mostrarficha();
  }
  Mostrarficha(){
    try {
      console.log(this.myPaciente.Codigo)
      this.cps.getMFicha(this.myPaciente.Codigo)
      .subscribe(data => { 
        this.myFicha = data.json();
        console.log("longitud de objeto", this.myFicha.length)
        if (this.myFicha.length === undefined) {
          this.errorMysql = 1;
        } else {
          this.errorMysql = 2;
        }
        console.log("numero errorMysql", this.errorMysql)
      },
      err => {        
         if (err.status == 404) {
         } else {
          console.log("error de Mysql")
         }
       },
       () => console.log("mostrarFicha -> completado")
      );
    } catch (error) {
       console.log("asqsdadsa")
    }  
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  volver(){
    this.navCtrl.pop();
  }
}
