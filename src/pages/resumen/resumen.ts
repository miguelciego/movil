import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage {

  public Ficha;
  public Hora;
  public resumen;
  constructor(
  public navCtrl: NavController,
  public navParams: NavParams
  ){
  this.Hora = navParams.get('Hora');
  this.Ficha = navParams.get('Ficha');
  this.Ficha.valorh = this.Hora.Valor;
  this.Ficha.horaD = this.Hora.Descripcion;
  console.log(this.Ficha);
  this.resumen = this.Ficha;
  }
  ionViewDidLoad() {
  }
  principal(){
    this.navCtrl.popToRoot();
  }
}
