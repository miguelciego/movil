import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AfiliadoStorage } from '../../providers/afiliado-storage';
import { Device } from 'ionic-native';

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
    private alertCtrl: AlertController
    ) {
    this.loginForm = this.myLoginForm;
    this.device = {};
    platform.ready().then(() => {
      this.device['uuid'] = Device.uuid;
      this.device['platform'] = Device.platform;
      this.device['manufacturer'] = Device.manufacturer;
      this.device['version'] = Device.version;
      this.device['serial'] = Device.serial;
      this.device['model'] = Device.model;
    });
  }
  ionViewDidLoad(){}
  private get myLoginForm(){
    return this.fb.group({
      'matricula': ['19860529CPE',[Validators.required, Validators.maxLength(11),Validators.minLength(10)]],
      'filial': ['1',Validators.required]
    })
  }
  Guardar() {
    let load = this.LoadCtrl.create();
    load.present();
    this.cps.putVerification(
      this.loginForm.value.matricula,
      this.device.platform,
      this.device.manufacturer,1,1,
      this.device.model,
      this.device.uuid
    ).subscribe(
      data => {
        this.datos = data.json();
          //if(this.datos != null && this.datos.estado == 2){
          if(this.datos != null){
              console.log("el estado es ",this.datos.estado);
              let a = { "Id": this.datos.cod_afi, "matricula": this.loginForm.value.matricula,"filial": this.loginForm.value.filial}
              this.afiliado.push(a);
              this.AfiliadoStorage.create( this.afiliado ).then(data =>{
              console.log("agregado correctamente")
              this.navCtrl.push(MitabPage);
              load.dismiss();
            })
            .catch(error =>{
              console.log(error)
            })
          }
          else{
           load.dismiss();
           console.log("La matricula ingresada ya esta vinculada!");
           this.presentAlert();
          }
        },
        err => console.error(err),
        () => console.log('Completado')
    );
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: 'La matrícula ingresada ya esta vinculada!',
      buttons: ['Ok']
    });
    alert.present();
  }
}