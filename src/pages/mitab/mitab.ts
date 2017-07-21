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
  tab3Root: any = 'PermisoPage'
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
    //console.log("datos del login",this.getLogin());
    /* platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()){
          nav.pop();
        }else{
          this.AlertBackButton();
        }
      });
    });*/
  }
  refreshScrollbarTabs() {
    this.scrollableTabsopts = { refresh: true };    
  }
  /*getLogin(){
    this.login = this.navParams.get('login');
    if(this.login != undefined) {
      return this.login;
    }*/
  //}
  /* AlertBackButton() {
    let alert = this.AlertCrtl.create({
      title: '¿ Desea salir de la Aplicacíon ?',
      buttons: [
        {
          text: 'No',
          role: 'No',
          handler: () => {
            console.log('No');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log("salio de la aplicacion")
            this.platform.exitApp(); 
          }
        }
      ]
    });
    alert.present();
   }*/
  
}