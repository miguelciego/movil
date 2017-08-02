import { Component } from '@angular/core';
import { IonicPage, PopoverController, LoadingController, AlertController, Platform, ToastController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';
import { DomSanitizer } from '@angular/platform-browser';
import { Network } from '@ionic-native/network';

import { CpsProviders } from '../../providers/cps';
import { AfiliadoStorage } from '../../providers/afiliado-storage';

//import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
  providers: [CpsProviders]
})
export class MapasPage {

  public Maps;
  public dptStorage;
  private check: boolean;
  private inicalesDpts: any = [];
  private mostrar:boolean= false;

  constructor(
    private platform: Platform,
    public AfiliadoStorage: AfiliadoStorage,
    public cps: CpsProviders,
    public popoverCtrl: PopoverController,
    private sanitizer: DomSanitizer,
    public LoadCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toast: ToastController,
    private network: Network
  ) {
    this.cargarDatos()
  }
  cargarDatos() {
    this.AfiliadoStorage.getAll()
      .then((data: any[]) => {
        Object.keys(data).forEach(key => {
          this.dptStorage = data[key].filial;
          console.log("storage DTPS", this.dptStorage)
        });
        this.maps(this.dptStorage)
        this.depar();
      })
      .catch(error => {
        console.log("Error : ", error)
      })
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  maps(abrev) {
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
    });
    load.present();
    this.cps.getMaps(abrev)
      .subscribe(data => {
        this.Maps = data
        console.log("maps", this.Maps);
        load.dismiss()
        this.mostrar= true;
      },
      err => {
        console.log(err.status);
        load.dismiss()
        this.mostrar= false
        this.toastError()
      },
      () => console.log('getmaps -> completado')
      );
  }
  depar() {
    this.cps.getDepartamental()
      .subscribe(data => {
        this.inicalesDpts = data.json();
        console.log("departamentales", this.inicalesDpts)
      },
      err => {
        console.log(err.status);
      },
      () => console.log('getmaps -> completado')
      );
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  showRadioAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Departamental');
    Object.keys(this.inicalesDpts).forEach(key => {
      if (this.inicalesDpts[key].abrev == this.dptStorage) {
        this.check = true;
      } else {
        this.check = false;
      }
      alert.addInput({
        type: 'radio',
        label: this.inicalesDpts[key].nombre,
        value: this.inicalesDpts[key].abrev,
        checked: this.check
      });
    });
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log("result", data)
        this.dptStorage = data;
        if(this.mostrar == true){
          this.maps(data);
        }
      }
    });
    alert.present();
  }
  toastError() {
    let toast = this.toast.create({
      message: 'Se ha producido un error. Intentalo de nuevo',
      position: 'bottom',
      showCloseButton: true,
      closeButtonText:'REINTENTAR'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.cargarDatos()
    });
    toast.present();
  }
}
