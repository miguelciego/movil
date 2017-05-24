import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavController} from 'ionic-angular';

import { AfiliadoStorage } from '../../providers/afiliado-storage';
import { Storage } from '@ionic/storage';        
        
@Component({
  templateUrl: 'popover.html'
})
export class PopoverPage {
  constructor(
  public viewCtrl: ViewController,
  public navCtrl: NavController,
  public AfiliadoStorage: AfiliadoStorage,
  public storage:Storage
  ){
  }
  close() {
    this.viewCtrl.dismiss();
    this.Session();
  }
  private Session(){
    this.AfiliadoStorage.getAll()
    .then((afiliado: any[]) =>{
      if(afiliado == null){
         console.log("entro",afiliado)
      }else{
          console.log("salio");
          this.storage.clear()
      }
    })
    .catch(error =>{
      console.log("Error al iniciar",error)
    })
  }
}