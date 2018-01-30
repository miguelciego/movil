import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar, ToastController, LoadingController } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';
import { AfiliadoStorage } from '../../providers/afiliado-storage';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-permiso',
  templateUrl: 'permiso.html',
  providers: [CpsProviders]
})
export class PermisoPage {
  @ViewChild('si') searchInput: Searchbar;

  query: Subscription;
  cancel: boolean = false;
  
  private rescount;
  private nombrebus: string = '';
  private infinite: any = 1000000000000000000000000000000000000;
  private errorApi: boolean;
  private length: any;
  private data: any = [];
  private listpermiso: any = [];
  private dpts;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public LoadCtrl: LoadingController,
    private aStorage: AfiliadoStorage,
    private cps: CpsProviders
  ) {
    console.log(this.length)
    this.initializeItems()
  }
  ionViewWillLeave() {
    if (this.cancel == true) { this.query.unsubscribe(); }
  }
  ionViewWillEnter() {
    this.cancel = true;
    this.length = 0;
    this.aStorage.getAll()
      .then((result: any) => {
        Object.keys(result).forEach(key => {
          this.dpts = result[key].filial;
        });
        this.query = this.cps.getPermiso(this.dpts)
          .subscribe(data => {
            this.data = data.json();
            this.initializeItems();
            this.length = this.data.length;
            this.errorApi = false;
            if (this.length == 0) { this.length = this.infinite }
          },
          err => {
            console.log(err.status);
            this.length = 1;
            this.errorApi = true;
            this.toastError();
          },
          () => console.log("PermisoPage => Proceso terminado")
          );
      })
      .catch(error => {
        console.log(error)
      })
  }
  initializeItems() {
    this.listpermiso = this.data;
  }
  getItems(searchbar) {
    //Restablecer elementos de nuevo a todos los elementos
    this.initializeItems();
    // Ajuste q al valor de la barra de búsqueda
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items //si imput esta vacio 
    if (!q) {
      this.rescount = 1;
      return;
    }
    this.listpermiso = this.listpermiso.filter((v) => {
      if (v.nombrec && q) {
        if (v.nombrec.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    this.nombrebus = q;
    this.rescount = this.listpermiso.length;
    console.log(this.nombrebus, this.rescount, this.length);
  }
  toastError() {
    let toast = this.toastCtrl.create({
      message: 'Se ha producido un error. Inténtalo más tarde',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  volver() {
    this.navCtrl.pop();
  }
  onClear() {
    this.rescount = 1;
    console.log(this.nombrebus, this.rescount, this.length);
  }
  onCancel(){
    
  }
}