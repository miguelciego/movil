import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, LoadingController} from 'ionic-angular';
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
  cancel;
  private day = new Date().toJSON().slice(0, 10);
  public myPaciente;
  public dpts;
  public Recetaslist: any[] = [];
  private fechaResult;
  private length;

  public dateForm: FormGroup;
  public icon = "add-circle";

  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public navParams: NavParams,
    private cps: CpsProviders,
    public LoadCtrl: LoadingController,
    public fb: FormBuilder,
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
    if (this.cancel == true) { this.query.unsubscribe(); }
    console.log("paso por ionViewWillLeave VADEMECUN")
  }
  Buscar() {
    this.cancel = true;
    this.fechaResult = "Buscando...";
    this.length = 0;
    if (this.dateForm.value.ini == '' || this.dateForm.value.fin == '') {
      this.dateForm.value.ini = this.day
      this.dateForm.value.fin = this.day
      console.log("debes seleccionar un rago de fechas")
    }
    this.query = this.cps.getMedicamentos(this.myPaciente.Codigo, this.dateForm.value.ini, this.dateForm.value.fin)
      .subscribe(data => {
        this.Recetaslist = data.json();
        this.length = this.Recetaslist.length;
        console.log("longitud del medicamento", length);
        if (length <= 0) {
          this.fechaResult = "Sin resultados"
        } else {
          this.fechaResult = "Se han encontrado " + length + " recetas médicas.";
        }
      },
      err => {
        this.fechaResult = "Se ha producido un error. Inténtalo nuevamente";
        console.log(err.status);
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
}

