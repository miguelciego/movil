import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class gFamiliarStorage {

  private key = 'grupoFamiliar';
  constructor(
     public storage: Storage
  ) {}
  getAll(){
    return new Promise((resolve, reject)=>{
      this.storage.get(this.key)
      .then(data=>{
        console.log('Respuesta : Grupo Storage');
        resolve(JSON.parse(data))
      })
      .catch(error =>{
       console.log("Storage getAll error")
       console.log(reject(error))
      })
    })
  }

  create(grupoFamiliar){
    console.log("Agregado correctamento G storage")
    return this.storage.set(this.key, JSON.stringify(grupoFamiliar))
  }
  delete(key){
    console.log("eliminar")
    return this.storage.remove(key)
  }
}