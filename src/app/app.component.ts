import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
        
@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen]
})
export class MyApp {
    public session;
    rootPage:any = 'VerificacionPage';

  constructor(
     platform: Platform,
     private statusBar: StatusBar,
     public splashscreen :SplashScreen
  ){
     platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashscreen.hide();
     });
  }
}
