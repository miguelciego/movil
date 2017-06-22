import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AfiliadoStorage } from '../../providers/afiliado-storage';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [CpsProviders]
})
export class LoginPage {


  public afiliado: any[] = [];
  public datos;
  public device;
  public loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,    
    public fb: FormBuilder,
    private toast :ToastController,
    private platform: Platform,
    public AfiliadoStorage : AfiliadoStorage,
    public cps: CpsProviders,
    public LoadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl:ModalController,
    private viewCtrl:ViewController
    ) {    
      this.loginForm = this.myLoginForm;
      this.device = {};
  }
  ionViewDidLoad(){}
  private get myLoginForm(){
    return this.fb.group({
      'matricula': ['19735917osr',[Validators.required, Validators.maxLength(11),Validators.minLength(10)]],
      'filial': ['sc',Validators.required]
    })
  }
  Guardar() {
    let load = this.LoadCtrl.create({
      content: 'Verificando...'
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
            if(this.datos != null && this.datos.estado == 2 || this.datos.estado == 1){
              console.log("el estado es ",this.datos.estado);
              let a = { "Id": this.datos.cod_afi, "matricula": this.loginForm.value.matricula,"filial": this.loginForm.value.filial}
              this.afiliado.push(a);
              this.AfiliadoStorage.create( this.afiliado ).then(data =>{
              console.log("agregado correctamente")
              this.navCtrl.setRoot('MitabPage');
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
      buttons: ['Bueno']
    });
    alert.present();
  }

  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [{ text: 'Bueno', handler: () => { this.platform.exitApp() }}]
    });
    alert.present();
  }

  AlertFilial(dpts) {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos ...',
      subTitle: '..Pero la matrícula ' + this.loginForm.value.matricula + ' no se ha encontrado en el departamento de '+ dpts,
      buttons: ['Bueno']
    });
    alert.present();
  }
}