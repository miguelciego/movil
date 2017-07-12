import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen, Push]
})
export class MyApp {

  public session;
  rootPage: any = 'VerificacionPage';

  constructor(
    public app: App,
    public platform: Platform,
    private statusBar: StatusBar,
    public splashscreen: SplashScreen,
    public push: Push
  ) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.initPushNotification();
    });
  }
  initPushNotification() {
    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('Tenemos permiso para enviar notificaciones push');
        } else {
          console.log('No tenemos permiso para enviar notificaciones push');
        }
      })
      .catch( error =>{
          console.log(error)
      });

    // to initialize push notifications

    const options: PushOptions = {
      android: {
        senderID: '478631521404',
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification')
      .subscribe((notification: any) =>
        console.log('Received a notification', notification)
      );

    pushObject.on('registration')
    .subscribe((registration: any) =>
     console.log('Device registered', registration)
     );

    pushObject.on('error').subscribe(error => 
    console.error('Error with Push plugin', error)
    );
  }
}
