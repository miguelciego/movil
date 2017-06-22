import { Component } from '@angular/core';
import { IonicPage, NavController,Nav, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-vademecun',
  templateUrl: 'Vademecun.html',
  providers: [CpsProviders]
})
export class VademecunPage {

  public codigo;
  public dpts;
  public Recetaslist:any[]=[];
  
  public dateForm: FormGroup;
  public icon="add-circle";

  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl:ToastController,
    private cps: CpsProviders,
    public LoadCtrl: LoadingController,
    public fb: FormBuilder
  ){
    this.codigo = navParams.get('Codigo');
    this.dpts = navParams.get('dpts');
    console.log("el codigo es ", this.codigo)
    console.log("el dpts es ", this.dpts)
    this.dateForm = this.myDateForm;
  }
  private get myDateForm(){
    return this.fb.group({
      'ini': ['',Validators.required],
      'fin': ['', Validators.required]
    })
  }
  Guardar(){
    this.cps.getMedicamentos(this.dpts, this.codigo, this.dateForm.value.ini, this.dateForm.value.fin)
    .subscribe(data => { 
        this.Recetaslist = data.json();
        console.log("longitud del medicamento",this.Recetaslist.length);
        this.presentToast(this.Recetaslist.length)
        },
      err => { if (err.status == 404) {
        } else {
            console.log(err.status);
          }
        },
      () => console.log('getMedicamentos -> completado')
    ); 
  }
  ionViewDidLoad() {
  }
  VerDetalle(receta){
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
      message: 'Se han encontado ' + lenght + ' medicamentos.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}

