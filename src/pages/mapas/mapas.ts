import { Component } from '@angular/core';

import { CpsProviders } from '../../providers/cps';

@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
  providers: [CpsProviders]
})
export class MapasPage {

  public Maps;
  constructor(
  public cps: CpsProviders
  ){
    this.AllMaps();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapasPage');
  }
  AllMaps(){
    this.Maps =  this.cps.getFiliales1();
  }
}
