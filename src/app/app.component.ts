import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { MitabPage } from '../pages/mitab/mitab';
import { AfiliadoStorage } from '../providers/afiliado-storage';
        
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    public session;
    rootPage:any = LoginPage;

  constructor(
     platform: Platform,
     public AfiliadoStorage: AfiliadoStorage,
  ){
     platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.Session();
     });
  }
  public Session(){
    this.AfiliadoStorage.getAll()
    .then((afiliado: any[]) =>{
      console.log('data', afiliado);
      if(afiliado == null){
         this.rootPage = LoginPage;
         console.log("console",afiliado)
      }else{
         this.rootPage = MitabPage;
      }
    })
    .catch(error =>{
      console.log("Error al iniciar",error)
    })
  }
}
