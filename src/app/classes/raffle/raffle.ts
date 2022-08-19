import { CampaingClass } from 'src/app/classes/campaing/campaing';
import { UserClass } from 'src/app/classes/users/user';
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
  private RaffleInfo;
  private cachePath = environment.global.path.raffle;
  private cacheAdminActivePath = environment.global.path.adminActiveCampaigns;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.path.raffle;
  private interfaceRef: Raffle;

  constructor(
    public user: UserClass,
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService,
    private camp: CampaingClass
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  migrateToCollection() {
    const campaign = this.camp.get().raffles;
    for (const a of campaign) {
      this.crud.add(this.collection, a).then((res) => {
        console.log(res);
        const obj = a;
        obj.id = res.id;
        this.crud.update(this.collection, obj, res.id);
      });
    }
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

  set(value) {
    this.RaffleInfo = value;
    console.log(value);
  }

  reset() {
    this.RaffleInfo = null;
  }

  getRaffleById(id): Promise<any> {
    return new Promise((resolve) => {
      if (this.get()) {
        if (this.get().id === id) {
          resolve(this.get());
        }
      } else {
        this.getCache(this.cacheAdminActivePath).then((cache) => {
          for (const a of cache) {
            if (a.id === id) {
              resolve(a);
            }
          }
        });
      }
    });
  }

  setClass(shouldUpdate): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache(this.cachePath).then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((http) => {
              this.set(http[0]);
              this.setCache(this.cachePath, http[0]);
              resolve(http[0]);
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

  add(object: Raffle) {
    this.crud.add(this.collection, object);
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
