import { Component } from '@angular/core';
import { Platform, App , ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen]
  //providers: [StatusBar, SplashScreen, Push]
})
export class MyApp {

  public session;
  rootPage: any = 'VerificacionPage';

  constructor(
    public app: App,
    public platform: Platform,
    private statusBar: StatusBar,
    public splashscreen: SplashScreen,
    private toast: ToastController,
    //public push: Push,
    private network: Network
  ) {
   this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashscreen.hide();

    this.network.onDisconnect().subscribe(data => {
      //this.toastErrorInternet();
    }, error => console.error(error));
    });
  }
 toastErrorInternet() {
    this.toast.create({
      message: `Sin conexion.`,
      cssClass: 'error',
      position:'bottom',
      duration: 4000
    }).present();
  }
  /*initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '478631521404'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              console.log(" notificacion blab bla")
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }*/
}
