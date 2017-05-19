import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';

import { AfiliadoService } from '../../providers/afiliado-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public afiliado = [];
  public txtmatricula : any;
  public txtfilial : any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public sqliteService : AfiliadoService,
    protected platform : Platform
  ) {
    this.platform.ready().then(() => {
        this.sqliteService.getAll().then(s => {
            this.afiliado = this.sqliteService.arr;
          });
      })
  }
  public Adicionar(matricula,filial) {
      console.log("matricula es ",matricula);
      console.log("filial es ",filial);
    this.sqliteService.agregarItem(matricula,filial)
      .then(s => {
        this.afiliado = this.sqliteService.arr;
        this.txtmatricula = '';
        this.txtfilial = '';
      })
      .catch(error =>{
          console.log('Error en Adicionar',error);
      });
  }

  Eliminar(id) {
    this.sqliteService.eliminar(id)
      .then(s => {
        this.afiliado = this.sqliteService.arr;
      })
      .catch(error =>{
          console.log('Error al Eliminar',error);
      });
  }

  Modificar(id, matricula) {
    var prompt = window.prompt('Editar Matricula', matricula);
    this.sqliteService.modificar(id, prompt)
    .then(s => {
        this.afiliado = this.sqliteService.arr;
      })
    .catch(error =>{
          console.log('Error al Modificar',error);
      });
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  } 
}