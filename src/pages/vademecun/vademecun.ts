import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CpsProviders } from '../../providers/cps';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-vademecun',
  templateUrl: 'Vademecun.html',
  providers: [CpsProviders]
})
export class VademecunPage {

  query: Subscription;

  private day = new Date().toJSON().slice(0, 10);
  public myPaciente;
  public dpts;
  public Recetaslist: any[] = [];
  private fechaResult = "Buscando...";
  private length;

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
    this.myPaciente = navParams.get('myPaciente');
    this.dpts = navParams.get('dpts');
    console.log("el codigo es ", this.myPaciente.codigo)
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
  }
  ionViewWillLeave(){
    this.query.unsubscribe();
    console.log("paso por ionViewWillLeave VADEMECUN")
  }
  Buscar() {
    if (this.dateForm.value.ini == '' || this.dateForm.value.fin == '') {
      this.dateForm.value.ini = this.day
      this.dateForm.value.fin = this.day
      console.log("debes seleccionar un rago de fechas")
    }
    let load = this.LoadCtrl.create({
      content: 'Medicamentos...',
      dismissOnPageChange: true
    });
    load.present()
    this.query = this.cps.getMedicamentos(this.myPaciente.Codigo, this.dateForm.value.ini, this.dateForm.value.fin)
      .subscribe(data => {
        this.Recetaslist = data.json();
        load.dismiss()
        this.length = this.Recetaslist.length;
        console.log("longitud del medicamento", length);
        if (length <= 0) {
          this.fechaResult = "No se le ha recetado medicamentos el día de hoy."
        } else {
          this.fechaResult = "Se han encontrado " + length + " recetas médicas.";
        }
      },
      err => {
        console.log(err.status);
        this.AlertError();
      },
      () => console.log("termino")
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
      buttons: [{ text: 'Ok', handler: () => { this.navCtrl.pop(); } }]
    });
    alert.present();
  }
}

