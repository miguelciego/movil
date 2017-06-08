import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AfiliadoStorage } from '../../providers/afiliado-storage';
//import { Device } from 'ionic-native';

import { MitabPage } from '../mitab/mitab';

import { CpsProviders } from '../../providers/cps';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [CpsProviders]
})
export class LoginPage {

  afiliado: any[] = [];
  public datos;
  public device;
  public loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,    
    public fb: FormBuilder,
    private platform: Platform,
    public AfiliadoStorage : AfiliadoStorage,
    public cps: CpsProviders,
    public LoadCtrl: LoadingController,
    private alertCtrl: AlertController,
    ) {    
    this.loginForm = this.myLoginForm;
    this.device = {};
    /*platform.ready().then(() => {
      this.device['uuid'] = Device.uuid;
      this.device['platform'] = Device.platform;
      this.device['manufacturer'] = Device.manufacturer;
      this.device['version'] = Device.version;
      this.device['serial'] = Device.serial;
      this.device['model'] = Device.model;
    });*/
  }
  ionViewDidLoad(){}
  private get myLoginForm(){
    return this.fb.group({
      'matricula': ['19860529cpe',[Validators.required, Validators.maxLength(11),Validators.minLength(10)]],
      'filial': ['sc',Validators.required]
    })
  }
  Guardar() {
    let load = this.LoadCtrl.create({
      content: 'Verificando datos...'
    });
    load.present();
    this.cps.putVerification(
      this.loginForm.value.filial,
      this.loginForm.value.matricula,
      this.device.platform,
      this.device.manufacturer,1,1,
      this.device.model,
      this.device.uuid)
    .subscribe(data => {
        this.datos = data.json();
            console.log("login.ts, estado =>", this.datos.estado)
            if(this.datos != null && this.datos.estado == 2 ||this.datos.estado == 1){
              console.log("el estado es ",this.datos.estado);
              let a = { "Id": this.datos.cod_afi, "matricula": this.loginForm.value.matricula,"filial": this.loginForm.value.filial}
              this.afiliado.push(a);
              this.AfiliadoStorage.create( this.afiliado ).then(data =>{
              console.log("agregado correctamente")
              this.navCtrl.setRoot(MitabPage);
              load.dismiss();
            })
            .catch(error =>{
            })
          }
          else if(this.datos != null && this.datos.estado == 0){
            load.dismiss();let dpts
            if(this.loginForm.value.filial == "sc"){ dpts ="Santa Cruz." }
            if(this.loginForm.value.filial == "co"){ dpts ="Cochabamba." }
            if(this.loginForm.value.filial == "lp"){ dpts ="La paz." }
            this.AlertFilial(dpts) 
          }
          else{
           load.dismiss();
           console.log("La matrícula " + this.loginForm.value.matricula + " ya se encuentra vinculada en un telefono movil.");
           this.AlertVinculado();
          }
        },
        err => { if (err.status == 404) {
        } else {
            console.log(err.status);
            load.dismiss();
            this.AlertError();
          }
        },
        () => console.log('Completado')
    );
  }
  AlertVinculado() {
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: 'La matrícula ' + this.loginForm.value.matricula + ' ya se encuentra vinculada en un teléfono movil.',
      buttons: ['Ok']
    });
    alert.present();
  }
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos ...',
      subTitle: '..Pero en entos momentos no podemos responder a tu solicitud.',
      buttons: ['Ok']
    });
    alert.present();
  }
  AlertFilial(dpts) {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos ...',
      subTitle: '..Pero la matrícula ' + this.loginForm.value.matricula + ' no se ha encontrado en el departamento de '+dpts,
      buttons: ['Ok']
    });
    alert.present();
  }
}