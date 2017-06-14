import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-especialidades',
  templateUrl: 'especialidades.html',
  providers: [CpsProviders]
})
export class EspecialidadesPage {
  public Filial;
  public Especialidades;
  public Ficha;
  public length;

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams, 
  private cps: CpsProviders,
  public LoadCtrl: LoadingController,
  public alertCtrl:AlertController,
  public toastCtrl:ToastController
  ) {
    this.Ficha = navParams.get('Ficha');
    this.Filial = navParams.get('Filial');
    
    this.Ficha.FilialCodigo = this.Filial.Codigo;
    this.Ficha.FilialDescripcion = this.Filial.Nombre ;
    this.Ficha.Fecha  = this.Filial.Fecha ;
    this.listEspecialidad()
  }
  listEspecialidad(){
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
      duration: 5000
    });
    load.present();
    this.cps.getEspecialidades(this.Ficha.dpts,this.Filial.Codigo,this.Filial.Fecha)
    .subscribe(data => { 
        this.Especialidades = data.json();
        console.log("Especialidades",this.Especialidades);
        this.length = this.Especialidades.length;
        console.log("longitud de la especialidad",this.length)
        load.dismiss();
        },
      err => { if (err.status == 404) {
        } else {
            console.log(err.status);
            load.dismiss();
            this.AlertError();
          }
        },
      () => console.log('getEspecialidades -> completado')
    ); 
  }
  iraMedicos(Especialidad) {
    this.navCtrl.push('MedicosPage', { Especialidad: Especialidad, Ficha: this.Ficha });
  } 
  volver(){
    this.navCtrl.pop();
  }
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Problemas de Conexion!',
      buttons: [
        {
          text: 'Listo',
          handler: () => {
            this.navCtrl.popToRoot()
            this.ToastAlertError();
          }
        }
      ]
    });
    alert.present();
  }
  ToastAlertError() {
    let toast = this.toastCtrl.create({
      message: 'Problemas de Conexión',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}
