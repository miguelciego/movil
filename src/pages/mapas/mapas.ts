import { Component } from '@angular/core';
import { PopoverController, LoadingController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';
import { DomSanitizer} from '@angular/platform-browser';

import { CpsProviders } from '../../providers/cps';
import { AfiliadoStorage } from '../../providers/afiliado-storage';

@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
  providers: [CpsProviders]
})
export class MapasPage {

  public Maps;
  public dpts;

  constructor(
    public AfiliadoStorage : AfiliadoStorage,
    public cps: CpsProviders,
    public popoverCtrl: PopoverController,
    private sanitizer:DomSanitizer,
    public LoadCtrl:LoadingController
  ){
    this.AllMaps();
  }
  ionViewDidLoad() {}
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  AllMaps(){
    let load = this.LoadCtrl.create({
      spinner: 'hide',
      content: 'Cargando...',
      duration:5000
    });
    load.present();
    this.AfiliadoStorage.getAll()
    .then((data: any[]) =>{
      Object.keys(data).forEach( key => { 
          this.dpts = data[key].filial;
      });
        switch (this.dpts) {
          case "sc":
              this.Maps =  this.cps.getFilialessc();
              load.dismiss();
            break;
          case "co":
              this.Maps =  this.cps.getFilialesco();
              load.dismiss();
            break;
          case "lp":
              this.Maps =  this.cps.getFilialeslp();
              load.dismiss();
            break;
        }
      })
    .catch(error =>{
      console.log(error)
    })
  }
  sanitize(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
