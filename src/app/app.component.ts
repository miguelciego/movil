import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
//import { MitabPage } from '../pages/mitab/mitab';
import { AfiliadoService } from '../providers/afiliado-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

    rootPage = LoginPage;

  constructor(
    platform: Platform,
    AfiliadoService:AfiliadoService
    ) {
     platform.ready().then(() => {
      // Bueno, así que la plataforma está lista y nuestros complementos están disponibles.
       // Aquí puedes hacer cualquier cosa nativa de nivel superior que puedas necesitar.
      StatusBar.styleDefault();
      Splashscreen.hide();
      AfiliadoService.openDb();
    });
  }
}
