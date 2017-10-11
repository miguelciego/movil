import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class permisoStorage {

  private key = 'permiso';
  constructor(
     public storage: Storage
  ) {}
  getAll(){
    return new Promise((resolve, reject)=>{
      this.storage.get(this.key)
      .then(data=>{
        console.log('Respuesta : Permiso Storage');
        resolve(JSON.parse(data))
      })
      .catch(error =>{
       console.log("Storage getAll error")
       console.log(reject(error))
      })
    })
  }

  create(permiso){
    return this.storage.set(this.key, JSON.stringify(permiso));
  }
  delete(){
    console.log("eliminar");
    return this.storage.clear();
  }
}