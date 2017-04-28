import { Component } from '@angular/core';
import { CentrosPage } from '../centros/centros'
import { MapasPage } from '../mapas/mapas'
import { HomePage } from '../home/home';
import { GrupoFamiliarPage } from '../grupofamiliar/grupofamiliar';
import { PopoverController } from 'ionic-angular';


@Component({
  selector: 'page-mitab',
  templateUrl: 'mitab.html'
})
export class MitabPage {

  tab1Root: any = HomePage;
  tab2Root: any = GrupoFamiliarPage;
  tab3Root: any = CentrosPage;
  tab4Root: any = MapasPage;

  constructor(
  public popoverCtrl: PopoverController) {}
}