import { Component } from '@angular/core';
import { NavController,Nav, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AfiliadoStorage } from '../../providers/afiliado-storage';
import { Device } from 'ionic-native';

import { MitabPage } from '../mitab/mitab';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  afiliado: any[] = [];
  public device;
  public loginForm: FormGroup;

  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public navParams: NavParams,    
    public fb: FormBuilder,
    private platform: Platform,
    public AfiliadoStorage : AfiliadoStorage 
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
      'matricula': ['19940827ftc',[Validators.required, Validators.maxLength(11),Validators.minLength(10)]],
      'filial': ['1',Validators.required]
    })
  }
  Guardar() {
      let a = {
        "Id": 1,
        "matricula": this.loginForm.value.matricula,
        "filial": this.loginForm.value.filial
      }
      this.afiliado.push(a);
      this.AfiliadoStorage.create( this.afiliado ).then(data =>{
        this.afiliado.unshift( data );
        console.log("agregado correctamente")
        this.navCtrl.push(MitabPage);
      })
      .catch(error =>{
      console.log(error)
    })
  }
  
}
