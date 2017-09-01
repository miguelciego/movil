import { Component } from '@angular/core';
import { IonicPage, App, Platform, ToastController, AlertController } from 'ionic-angular';
import { AfiliadoStorage } from '../../providers/afiliado-storage';

import { DomSanitizer } from '@angular/platform-browser';
import { CpsProviders } from '../../providers/cps';

@IonicPage()
@Component({
  selector: 'page-verificacion',
  templateUrl: 'verificacion.html',
  providers: [CpsProviders, AfiliadoStorage]
})
export class VerificacionPage {
  private departamental;
  private versionCode = 19;
  private code;
  private msj;
  private titulo;
  private mensaje;
  private act;

  constructor(
    public AfiliadoStorage: AfiliadoStorage,
    public platform: Platform,
    public appCtrl: App,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public cps: CpsProviders,
    private sanitizer: DomSanitizer
  ) {
    this.version()
  }
  version() {
    this.cps.putVersion(this.versionCode)
      .subscribe(data => {
        let result = data.json()
        console.log(result)
        Object.keys(result).forEach(key => {
          this.code = result[key].code;
          this.msj = result[key].msj;
        });
        console.log("code", this.code)
        console.log("msj", this.msj)
        if (this.code == false && this.msj == "Version Desactualizada") {
          this.titulo = "¡ Actualización Disponible !";
          this.mensaje = " Descarga la nueva versión de la aplicación CPS Móvil.";
          this.act = 1;
        }
        if (this.msj == "Version Actualizada") {
          this.Session();
        }
      },
      err => {
        console.log(err.status);
        this.AlertError();
      },
      () => console.log("Finalizo verificar Version")
      );
  }
  Session() {
    this.AfiliadoStorage.getAll()
      .then((afiliado: any[]) => {
        console.log('Datos en Afiliado Storage :', afiliado);
        if (afiliado == null) {
          console.log("verificacionPage storage =>", afiliado)
          this.cps.getDepartamental()
            .subscribe(data => {
              this.departamental = data.json();
              console.log("departamental", this.departamental);
              this.appCtrl.getRootNav().setRoot('LoginPage', { departamental: this.departamental });
            },
            err => {
              console.log(err.status);
              this.AlertError();
            },
            () => console.log("Terminó de Verificar")
            );
        } else {
          this.appCtrl.getRootNav().setRoot('MitabPage');
        }
      })
      .catch(error => {
        this.appCtrl.getRootNav().setRoot('MitabPage');
        console.log(error)
      })
  }
  AlertError() {
    let alert = this.alertCtrl.create({
      title: 'Problemas al iniciar',
      message: 'Se ha producido un error al iniciar la aplicación CPS Móvil, Vuelve a intentarlo más tarde.',
      cssClass: 'alertError',
      buttons: [{
        text: 'Ok', handler: () => {
        }
      }]
    });
    alert.onDidDismiss(() => {
      this.platform.exitApp();
    })
    alert.present();
  }
  sanitize(url: string) {
    console.log(this.sanitizer.bypassSecurityTrustUrl(url))
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
