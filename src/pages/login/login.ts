import { Component } from '@angular/core';
import { NavController,Nav, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Device } from 'ionic-native';

import { MitabPage } from '../mitab/mitab';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public device;
  public loginForm: FormGroup;
  /*private sqlite: SQLite;*/

  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public navParams: NavParams,    
    public fb: FormBuilder,
    private platform: Platform 
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
  ionViewDidLoad() {
    
  }
  private get myLoginForm(){
    return this.fb.group({
      'matricula': ['',[Validators.required, Validators.maxLength(11),Validators.minLength(10)]],
      'filial': ['',Validators.required]
    })
  }
  Guardar() {
    //datos verification
      console.log('matricula :',this.loginForm.value.matricula);
      console.log('SO :',this.device.uuid);
      console.log('Plataforma :',this.device.platform);
      console.log('Manufacture :',this.device.manufacturer);
      console.log('Version :',this.device.version);
      console.log('Seria :',this.device.serial);
      console.log('Modelo :',this.device.model);

      this.nav.setRoot(MitabPage,{login: this.loginForm.value});
  }
  
}
