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
        if(data){
          console.log('Se han encontrado datos en estorage');
          resolve(JSON.parse(data))
        }else{
          reject('No hay datos en estorage 1')
        }
      })
      .catch(error =>{
        reject(error)
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
