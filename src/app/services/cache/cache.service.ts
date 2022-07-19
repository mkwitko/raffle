import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(
    private storage: Storage
  ) 
  {
    this.iniStorage();
  }

   /*
  Inicialização do Sistema de Cache
  É chamado com a inicialização do app e retorna um toast caso tenha dado erro.
  */
  iniStorage(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.storage.create()
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  get(key: string): Promise<any>
  {
    return new Promise((resolve, reject) => {
      this.storage.get(key)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  }

  set(key: string, value: any): Promise<any>
  {
    return new Promise((resolve, reject) => {
      this.storage.set(key, value)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  }

  setArray(key: string, value: any, where): Promise<any>
  {
    return new Promise((resolve, reject) => {
      this.storage.get(key).then(cache => {
        if(!cache)
        {
          const arr = [{
            page: where,
            data: value
          }];
          this.storage.set(key, arr)
        } else 
        {
          const arr = cache;
          const push = {
            page: where,
            data: value
          }
          arr.push(push);
          this.storage.set(key, arr);
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  }

  remove(key: string): Promise<any>
  {
    return new Promise((resolve, reject) => {
      this.storage.remove(key)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  }

  clear(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      this.storage.clear()
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
}
