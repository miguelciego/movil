import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AfiliadoStorage {

  private key = 'afiliado';
  constructor(
     public storage: Storage
  ) {}
  getAll(){
    return new Promise((resolve, reject)=>{
      this.storage.get(this.key)
      .then(data=>{
        console.log('Respuesta : Afiliado Storage');
        resolve(JSON.parse(data))
      })
      .catch(error =>{
       console.log("Storage getAll error")
       console.log(reject(error))
      })
    })
  }

  create(afiliado ){
    return this.storage.set(this.key, JSON.stringify(afiliado));
  }
  delete(){
    console.log("eliminar");
    return this.storage.clear();
  }
}
