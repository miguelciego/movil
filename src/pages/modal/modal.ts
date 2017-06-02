import { Component } from '@angular/core';
import { NavController, App, NavParams, ViewController, LoadingController, AlertController,ToastController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
  providers: [CpsProviders]
})
export class ModalPage {
  public myFicha:any[]=[]; 
  public myPaciente;
  public errorMysql:any=0;
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
  public toastCtrl: ToastController
  ) {
    this.myPaciente = navParams.get('Paciente');
    let load = this.LoadCtrl.create();
    load.present();
    this.Mostrarficha();
    load.dismiss();
  }
  Mostrarficha(){
    try {
      console.log(this.myPaciente.Codigo)
      
      this.cps.getMFicha(this.myPaciente.Codigo)
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
    } catch (error) {
       console.log("catch error")
    }  
  }
  borrar(){
    let load = this.LoadCtrl.create();
    load.present();
    Object.keys(this.myFicha).forEach( key => {
            this.valor = this.myFicha[key].Valor
            this.estado = this.myFicha[key].TFicha
    });
    this.presentConfirm();
    load.dismiss();
  }  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  volver(){
    this.navCtrl.pop();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '¿ Quieres borrar la ficha ?',
      message: 'Escribe "BORRAR" en el campo para confirmar.',
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
            console.log("Click Cancelar");
          }
        },
        {
          text: 'Si',
          handler: data => {
            if(data.txt == "BORRAR" || data.txt == "Borrar" || data.txt == "borrar"){
              this.cps.putBFicha(this.valor, this.estado)
              .subscribe(
                data => {
                  this.resultado = data.json();
                  console.log("resultado -> ", this.resultado)
                  this.ToastMensaje();
                  this.dismiss();
                  },
                err => console.error(err),
                () => console.log('borrar -> completado')
              );
            }else{
              console.log("debe escribir correctamente borrar")
            }
          }
        }
      ]
    });
    alert.present();
  }
  ToastMensaje() {
    let toast = this.toastCtrl.create({
      message: 'Ficha cancelada con exito.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
