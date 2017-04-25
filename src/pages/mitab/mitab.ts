import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { FichasPage } from '../fichas/fichas'
import { CentrosPage } from '../centros/centros'
import { MapasPage } from '../mapas/mapas'
import { HomePage } from '../home/home';
import { GrupoFamiliarPage } from '../grupofamiliar/grupofamiliar';


@Component({
  selector: 'page-mitab',
  templateUrl: 'mitab.html'
})
export class MitabPage {

  tab1Root: any = GrupoFamiliarPage;
  tab2Root: any = CentrosPage;
  tab3Root: any = MapasPage;
  tab4Root: any = HomePage;

  constructor(public navCtrl: NavController) {

  }

}