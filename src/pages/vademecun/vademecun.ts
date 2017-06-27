import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-vademecun',
  templateUrl: 'Vademecun.html',
  providers: [CpsProviders]
})
export class VademecunPage {

  private day = new Date().toJSON().slice(0, 10);
  public codigo;
  public dpts;
  public Recetaslist: any[] = [];
  private fechaResult = "MEDICAMENTOS DE HOY";

  public dateForm: FormGroup;
  public icon = "add-circle";

  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private cps: CpsProviders,
    public LoadCtrl: LoadingController,
    public fb: FormBuilder,
    private alertCtrl: AlertController
  ) {
    this.codigo = navParams.get('Codigo');
    this.dpts = navParams.get('dpts');
    console.log("el codigo es ", this.codigo)
    console.log("el dpts es ", this.dpts)
    this.dateForm = this.myDateForm;
    this.Buscar();
  }
  private get myDateForm() {
    return this.fb.group({
      'ini': ['', Validators.required],
      'fin': ['', Validators.required]
    })
  }
  ionViewDidLoad() {

    console.log()
  }
  Buscar() {
    if(this.dateForm.value.ini == ''|| this.dateForm.value.fin =='')
    {
      this.dateForm.value.ini = this.day
      this.dateForm.value.fin = this.day
      console.log("debes seleccionar un rago de fechas")
    }else{

    }
    this.cps.getMedicamentos(this.dpts, this.codigo, this.dateForm.value.ini, this.dateForm.value.fin)
      .subscribe(data => {
        this.Recetaslist = data.json();
        let length = this.Recetaslist.length;
        console.log("longitud del medicamento", length);
        if (length <= 0) {
          this.fechaResult = "No se le ha recetado medicamentos el día de hoy."
        } else {
          this.fechaResult = "Se han encontrado " + length + " recetas médicas.";
        }
        this.presentToast(this.fechaResult)
      },
      err => {
        if (err.status == 404) {
        } else {
          console.log(err.status);
          this.AlertError();
        }
      },
      () => console.log('getMedicamentos -> completado')
      );
  }
  VerDetalle(receta) {
    this.icon = "remove-circle"
  }
  toggleSection(i) {
    this.Recetaslist[i].open = !this.Recetaslist[i].open;
  }
  toggleItem(i, j) {
    this.Recetaslist[i].children[j].open = !this.Recetaslist[i].children[j].open;
  }
  presentToast(lenght) {
    let toast = this.toastCtrl.create({
      message: lenght,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
  AlertError() {

    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [{ text: 'Bueno', handler: () => { console.log("Error") } }]
    });
    alert.present();
  }
}

