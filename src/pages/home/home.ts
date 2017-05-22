import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../mitab/popover';
import { Storage } from '@ionic/storage';

import { AfiliadoStorage } from '../../providers/afiliado-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Afiliado:any [] = [];
  public txtmatricula : any;
  public txtfilial : any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public AfiliadoStorage : AfiliadoStorage,
    protected platform : Platform,
    public  storage:Storage
  ) {
   
  }
  ionViewDidLoad() {
    this.getAfiliado();
    console.log("matricula",);
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  private getAfiliado(){
    /*this.tasksService.getAll()
    .then((tasks: any[]) =>{
      this.tasks = tasks;
    })*/
    this.AfiliadoStorage.getAll()
    .then((data: any[]) =>{
      this.Afiliado = data;
      Object.keys(this.Afiliado).forEach( key => {
          console.log(this.Afiliado[key]); //value    
          console.log("eso es",key); //key
      });
    })
    .catch(error =>{
      console.log(error)
    })
  }
  Eliminar(){
    this.storage.clear()
    console.log("Eliminar db")
  }
}