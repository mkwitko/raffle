import { UserClass } from 'src/app/classes/users/user';
import { promise } from 'protractor';
import { Raffle } from '../../interfaces/Raffle/Raffle';
import { CacheService } from '../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from '../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';

@Injectable()
export class RaffleClass {
  private RaffleInfo = new Array<Raffle>();
  private finder = [];

  private cachePath = environment.global.path.raffle;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.path.raffle;
  private interfaceRef: Raffle;

  constructor(
    public user: UserClass,
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  getAllHttp() {
    return new Promise((resolve) => {
      this.crud.getAll(this.collection).subscribe({
        next: (res) => {
          const result = res;
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }

  getHttp(id: string): Promise<any> {
    return new Promise((resolve) => {
      this.crud.get(this.collection, this.interfaceRef, id).subscribe({
        next: (res) => {
          const result = res;
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }

  getCache(cachePath = this.cachePath): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .get(cachePath)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get() {
    return this.RaffleInfo;
  }

  getCollection() {
    return this.collection;
  }

  getRef() {
    return this.ref;
  }

  setCache(cachePath, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .set(cachePath, value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  fill() {
    for (const a of this.get()) {
      this.finder[a.number] = a;
    }
  }

  find(number) {
    return this.finder[number];
  }

  set(value) {
    this.RaffleInfo = value;
    this.sort();
    this.fill();
  }

  sort() {
    this.RaffleInfo.sort((a, b) => (a.number < b.number ? -1 : 1));
  }

  reset() {
    this.RaffleInfo = null;
  }

  findSoldNumbers() {
    let result = [];
    for (const a of this.get()) {
      if (a.sold) {
        result.push(a);
      }
    }
    return result;
  }

  setClass(shouldUpdate): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache(this.cachePath).then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((http) => {
              this.set(http);
              this.setCache(this.cachePath, http);
              resolve(http);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.set(cache);
          resolve(cache);
        }
      });
    });
  }

  add(object: Raffle): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .add(this.collection, object)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async update(object: Raffle): Promise<any> {
    await this.screen.presentLoading();
    return new Promise((resolve, reject) => {
      this.crud
        .update(this.collection, object, object.id)
        .then((res) => {
          this.screen.dismissloading();
          resolve(res);
        })
        .catch((err) => {
          this.screen.dismissloading();
          reject(err);
        });
    });
  }
}
