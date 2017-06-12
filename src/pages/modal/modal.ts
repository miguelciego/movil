import { Component } from '@angular/core';
import { NavController, App, NavParams, ViewController, LoadingController, AlertController,ToastController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

import { MitabPage } from '../mitab/mitab';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
  providers: [CpsProviders]
})

export class ModalPage {

  public errorMysql=0;
  public Ficha:any;
  public myFicha:any[]=[];
  public myPaciente:any;
  public resultado:any;
  private valor:number;
  private estado:number;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public viewCtrl: ViewController,
  private cps: CpsProviders,
  public appCtrl: App,
  public LoadCtrl: LoadingController,
  private alertCtrl: AlertController,
  public toastCtrl: ToastController,
  ) {
    this.myFicha = navParams.get('myFicha');
    this.Ficha = navParams.get('Ficha');
    this.Mostrarficha();
  }

  Mostrarficha(){
    console.log("myFicha",this.myFicha)
    console.log("Ficha", this.Ficha)
    console.log("valor de la ficha", this.estado)
     this.cps.getMFicha(this.Ficha.dpts, this.Ficha.PacienteCodigo)
      .subscribe(data => { 
        this.myFicha = data.json();
        console.log("longitud de objeto", this.myFicha.length)
        switch (this.myFicha.length) {
            case undefined:
                 this.errorMysql = 1;
                break;
            case 0:
                 this.errorMysql = 3;
                break;
            default:
                 this.errorMysql = 2;
                break;
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
  }
  borrar(){
    this.presentConfirm();
  }  
  dismiss() {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(MitabPage)
  }
  volver(){
    this.navCtrl.pop();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      message: 'Si deseas Cancelar la ficha, Escribe "SI" en el campo para confirmar.',
      inputs: [
      {
        name: 'txt',
        placeholder: ''
      }
    ],
      buttons: [
        {
          text: 'No',
          role: 'No',
          handler: () => {
            console.log("valor", this.Ficha.PacienteCodigo);
            console.log("estado", this.Ficha.dpts);
            console.log("estado", this.estado);
          }
        },
        {
          text: 'Si',
          handler: data => {
            if(data.txt == "CANCELAR" || data.txt == "cancelar" || data.txt == "Cancelar"){
                this.cps.putBFicha( this.Ficha.dpts, this.valor, this.estado)
                .subscribe(
                  data => {
                    this.resultado = data.json();
                    console.log("resultado -> ", this.resultado)
                    switch (this.resultado.Codigo) {
                      case "B0":
                           this.dismiss();
                           this.ToastMensaje(this.resultado.Descripcion)
                        break;
                      case "E0":
                           this.dismiss();
                           this.ToastMensaje(this.resultado.Descripcion)
                        break;
                      case "E3":
                           this.dismiss();
                           this.ToastMensaje(this.resultado.Descripcion)
                        break;
                    }
                  },
                err => console.error(err),
                () => console.log('borrar -> completado')
              );
            }else{
              console.log("debe escribir correctamente Borrar.")
              this.ToastMensaje1();
            } 
          } 
        }
      ]
    });
    alert.present();
  }
  ToastMensaje(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  ToastMensaje1() {
    let toast = this.toastCtrl.create({
      message: 'Vuelve a intentarlo.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
