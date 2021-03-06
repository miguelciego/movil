import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from '@ionic-native/device';

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

  public loginForm: FormGroup;
  private departamental;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    private platform: Platform,
    public AfiliadoStorage: AfiliadoStorage,
    public LoadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private device: Device,
    public cps: CpsProviders
  ) {
    this.departamental = navParams.get('departamental');
    this.loginForm = this.myLoginForm;
  }
  ionViewDidLoad() {}

  private get myLoginForm() {
    return this.fb.group({
      'matricula': ['', [Validators.required, Validators.maxLength(12), Validators.minLength(11)]],
      'filial': ['sc', Validators.required]
    })
  }
  Guardar() {
    let load = this.LoadCtrl.create({
      content: 'Cargando...'
    });
    load.present();
    this.cps.putVerification(
      this.loginForm.value.filial,
      this.loginForm.value.matricula,
      this.device.platform,
      this.device.manufacturer, "0.1.6", 18,
      this.device.model,
      this.device.uuid)
      .subscribe(data => {
        console.log("version", this.device)
        this.datos = data.json();
        console.log("login.ts, estado =>", this.datos.estado)
        if (this.datos != null && this.datos.estado == 1 || this.datos.estado == 2) { //estado 2 para puebas libres
          console.log("el estado es ", this.datos);
          let a = { "Id": this.datos.cod_afi, "matricula": this.loginForm.value.matricula, "filial": this.loginForm.value.filial }
          this.afiliado.push(a);
          this.AfiliadoStorage.create(this.afiliado).then(data => {
            console.log("agregado correctamente")
            this.navCtrl.setRoot('MitabPage');
            load.dismiss();
          })
            .catch(error => {
            })
        }
        else if (this.datos != null && this.datos.estado == 0) {
          load.dismiss();
          this.AlertFilial()
        }
        else {
          load.dismiss();
          console.log("La matrícula " + this.loginForm.value.matricula + " ya se encuentra vinculada en un teléfono móvil.");
          this.AlertVinculado();
        }
      },
      err => {
          console.log(err.status);
          load.dismiss();
          this.AlertError();
      },
      () => console.log('Completado')
      );
  }
  AlertVinculado() {
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: 'La matrícula ' + this.loginForm.value.matricula + ' podrá vincularse en 24 horas.',
      buttons: ['Ok']
    });
    alert.present();
  }

  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [{ text: 'Ok', handler: () => { this.platform.exitApp() } }]
    });
    alert.present();
  }

  AlertFilial() {
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: 'La matrícula ' + this.loginForm.value.matricula + ' no se ha encontrado en la departamental seleccionada.',
      buttons: ['Ok']
    });
    alert.present();
  }
}