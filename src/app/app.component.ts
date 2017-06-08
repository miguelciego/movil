import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { VerificacionPage } from '../pages/verificacion/verificacion';
        
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    public session;
    rootPage:any = VerificacionPage;

  constructor(
     platform: Platform,
  ){
     platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
     });
  }
  
}
