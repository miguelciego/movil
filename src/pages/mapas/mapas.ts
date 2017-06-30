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
  public dptStorage;
  private check: boolean;
  private inicalesDpts: any = [];

  constructor(
    public AfiliadoStorage: AfiliadoStorage,
    public cps: CpsProviders,
    public popoverCtrl: PopoverController,
    private sanitizer: DomSanitizer,
    public LoadCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }
  ionViewDidLoad() {
    let load = this.LoadCtrl.create({
      content: 'Cargando...',
    });
    load.present();
    this.AfiliadoStorage.getAll()
      .then((data: any[]) => {
        Object.keys(data).forEach(key => {
          this.dptStorage = data[key].filial;
          console.log("storage DTPS", this.dptStorage)
        });
        this.maps(this.dptStorage)
        this.depar();
        load.dismiss();
      })
      .catch(error => {
        console.log(error)
      })
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  maps(abrev) {
    this.cps.getMaps(abrev)
      .subscribe(data => {
        this.Maps = data.json();
        console.log("maps", this.Maps);
      },
      err => {
        if (err.status == 404) {
        } else {
          console.log(err.status);
        }
      },
      () => console.log('getmaps -> completado')
      );
  }
  depar() {
    this.cps.getDepartamental()
      .subscribe(data => {
        this.inicalesDpts = data.json();
        console.log("departamentales", this.inicalesDpts)
      });

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
        let load = this.LoadCtrl.create({
          content: 'Cargando...',
        });
        load.present()
        console.log("result", data)
        this.dptStorage = data;
        this.maps(data);
        load.dismiss();
      }
    });
    alert.present();
  }
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      message: '...Pero en estos momentos no podemos responder a tu solicitud, Vuelve a intentarlo más tarde.',
      buttons: [
        {
          text: 'Bueno',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
}
