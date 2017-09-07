import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Searchbar } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-permiso',
  templateUrl: 'permiso.html',

})
export class PermisoPage {

  @ViewChild('si') searchInput: Searchbar;

  rescount;
  nombrebus: string = '';
  private length: any;
  private getPermiso: any = [];
  private listpermiso: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform
  ) {
    this.getPermiso = this.navParams.get('permisos');
    this.length = this.getPermiso.length;
    console.log(this.length)
    this.initializeItems()
  }
  volver() {
    this.navCtrl.pop();
  }
  initializeItems() {
    this.listpermiso = this.getPermiso;
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
}