import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar, ToastController } from 'ionic-angular';

import { CpsProviders } from '../../providers/cps';
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
  rescount;
  nombrebus: string = '';
  private infinite:any= 1000000000000000000000000000000000000;
  private errorApi: boolean;
  private length: any = 0;
  private data: any = [];
  private listpermiso: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private cps: CpsProviders,
  ) {
    console.log(this.length)
    this.initializeItems()
  }
  ionViewWillLeave() {
    if (this.cancel == true) { this.query.unsubscribe(); }
  }
  ionViewDidLoad(){
    this.cancel = true;
    this.query = this.cps.getPermiso()
    .subscribe(data => {
      this.data = data.json();
      this.length = this.data.length;
      if (this.length == 0) {this.length = this.infinite}
      this.initializeItems();
      console.log("Lista de permisos",this.listpermiso)
    },
    err => {
      console.log(err.status);
      this.length = 1;
      this.errorApi = true;
      this.toastError();
    },
    () => console.log('getmaps -> completado')
    );
  }
  initializeItems() {
    this.listpermiso = this.data;
  }
  getItems(searchbar) {
    //Restablecer elementos de nuevo a todos los elementos
    this.initializeItems();
    // Ajuste q al valor de la barra de búsqueda
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
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
    console.log(this.nombrebus, this.rescount);
  }
  toastError() {
    let toast = this.toastCtrl.create({
      message: 'Se ha producido un error. Inténtalo más tarde',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
  volver() {
    this.navCtrl.pop();
  }
}