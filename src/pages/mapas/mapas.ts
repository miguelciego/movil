import { Component } from '@angular/core';
import { IonicPage, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';
import { DomSanitizer } from '@angular/platform-browser';

import { CpsProviders } from '../../providers/cps';
import { AfiliadoStorage } from '../../providers/afiliado-storage';


@IonicPage()
@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
  providers: [CpsProviders]
})
export class MapasPage {

  public Maps;
  public dpts;
  private check:boolean;
  private departamental: any = [];

  constructor(
    public AfiliadoStorage: AfiliadoStorage,
    public cps: CpsProviders,
    public popoverCtrl: PopoverController,
    private sanitizer: DomSanitizer,
    public LoadCtrl: LoadingController,
    private atrCtrl: AlertController
  ) {
    this.AllMaps();
  }
  ionViewDidLoad() {
    this.departamental = this.cps.getDepartamental()
    console.log("departamental", this.departamental)
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  AllMaps() {
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
    });
    load.present();
    this.AfiliadoStorage.getAll()
      .then((data: any[]) => {
        Object.keys(data).forEach(key => {
          this.dpts = data[key].filial;
        });
        switch (this.dpts) {
          case "sc":
            this.Maps = this.cps.getFilialessc();
            load.dismiss();
            break;
          case "co":
            this.Maps = this.cps.getFilialesco();
            load.dismiss();
            break;
          case "lp":
            this.Maps = this.cps.getFilialeslp();
            load.dismiss();
            break;
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  showRadioAlert() {
    let alert = this.atrCtrl.create();
    alert.setTitle('Departamental');
    
    Object.keys(this.departamental).forEach(key => {
      if(this.dpts == this.departamental[key].abrev){
        this.check = true;
      }else{
        this.check = false;
      }

      alert.addInput({
        type: 'radio',
        label: this.departamental[key].Nombre,
        value: this.departamental[key].abrev,
        checked: this.check
      });
    });
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        let load = this.LoadCtrl.create({
          spinner: 'hide',
          content: 'Cargando...',
        });
        console.log("result", data)
        switch (data) {
          case "sc":
            this.dpts = data;
            this.Maps = this.cps.getFilialessc();
            console.log("result", this.Maps)
            load.dismiss();
            break;
          case "co":
            this.dpts = data;
            this.Maps = this.cps.getFilialesco();
            console.log("result", this.Maps)
            load.dismiss();
            break;
          case "lp":
            this.dpts = data;
            this.Maps = this.cps.getFilialeslp();
            console.log("result", this.Maps)
            load.dismiss();
            break;
        }
      }
    });
    alert.present();
  }
}
