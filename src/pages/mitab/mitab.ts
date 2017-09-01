import { Component} from '@angular/core';
import { IonicPage, NavParams, PopoverController, ToastController, Platform, App, AlertController } from 'ionic-angular';

//import { ScrollableTabs } from '../../components/scrollable-tabs/scrollable-tabs';

@IonicPage()
@Component({
  selector: 'page-mitab',
  templateUrl: 'mitab.html'
})
export class MitabPage {
  public login:any[]=[]
  mySelectedIndex: number;


  tab1Root: any = 'HomePage'
  tab2Root: any = 'GrupoFamiliarPage'
  tab4Root: any = 'MapasPage'

  scrollableTabsopts: any = {};

  constructor(
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public AlertCrtl:AlertController,
    public platform: Platform, 
    public app: App,

  ) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
  refreshScrollbarTabs() {
    this.scrollableTabsopts = { refresh: true };    
  }  
}